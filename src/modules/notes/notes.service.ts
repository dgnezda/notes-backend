import { Injectable, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Response } from 'express'
import { Note } from 'entities/note.entity'
import { User } from 'entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import archiver from 'archiver'
import slugify from 'slugify'
// import { JwtService } from '@nestjs/jwt'
import { getInternalNoteShareEmail, getExternalNoteShareEmail } from 'lib/getEmailString'
import { EmailService } from 'modules/email/email.service'
import { v4 as uuidv4 } from 'uuid'
import { ShareRecord } from 'entities/share-record.entity'

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name)

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ShareRecord)
    private shareRecordRepository: Repository<ShareRecord>,
    private emailService: EmailService,
    // private jwtService: JwtService,
  ) {}

  // ====================== //
  // PRIVATE HELPER METHODS //
  // ====================== //

  private async handleNoteSharing(note: Note, sender: User, recipientEmail: string): Promise<void> {
    try {
      const recipient = await this.userRepository.findOne({ where: { email: recipientEmail } })
      const token = uuidv4()
      const tokenExpiry = this.getTokenExpiryDate(14) // 14 days

      const isRecipientRegistered = !!recipient
      const shareLinkBase = isRecipientRegistered
        ? `${process.env.APP_URL}/notes/shared`
        : `${process.env.APP_URL}/notes/public`

      const sharedNoteLink = `${shareLinkBase}/${token}`

      await this.saveShareRecord(token, note.id, tokenExpiry, sender.id, recipient ? recipient.id : undefined)

      if (recipient) {
        // Existing user
        await this.ensureUsersAreFriends(sender, recipient)
        const emailContent = getInternalNoteShareEmail(note.title, sharedNoteLink, sender.firstName)
        await this.sendShareEmail(
          recipientEmail,
          `${sender.firstName} has shared a Note with you via dotmd.ink!`,
          emailContent,
        )
        this.logger.log(`Note shared with registered user ${recipientEmail}: ${sharedNoteLink}`)
      } else {
        // New user
        const emailContent = getExternalNoteShareEmail(note.title, sharedNoteLink, sender.firstName)
        await this.sendShareEmail(
          recipientEmail,
          `${sender.firstName} has invited you to view a note via dotmd.ink!`,
          emailContent,
        )
        this.logger.log(`Note shared with non-registered user ${recipientEmail} at ${sharedNoteLink}`)
      }
    } catch (error) {
      this.logger.error(`Failed to share note with ${recipientEmail}: ${error.message}`)
    }
  }

  private getTokenExpiryDate(daysValid: number): Date {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + daysValid)
    return expiry
  }

  private async ensureUsersAreFriends(sender: User, recipient: User): Promise<void> {
    const isFriend = await this.userRepository
      .createQueryBuilder('user')
      .relation(User, 'friends')
      .of(sender)
      .loadMany()
      .then((friends) => friends.some((friend) => friend.id === recipient.id))

    if (!isFriend) {
      await this.userRepository.createQueryBuilder().relation(User, 'friends').of(sender).add(recipient.id)
      await this.userRepository.createQueryBuilder().relation(User, 'friends').of(recipient).add(sender.id)
    }
  }

  private async sendShareEmail(recipientEmail: string, subject: string, content: string): Promise<void> {
    await this.emailService.sendMail(recipientEmail, subject, content)
  }

  // ====================== //
  // MAIN NOTE CRUD METHODS //
  // ====================== //

  async listNotes(userId: string): Promise<Note[]> {
    return this.noteRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })
  }

  async createNote(title: string, content: string, userId: string, isPinned: boolean = false): Promise<Note> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`)
    }

    const note = this.noteRepository.create({
      title,
      content,
      isPinned,
      user,
    })

    await this.noteRepository.save(note)
    this.logger.log(`Note created: ${note.id}`)
    return note
  }

  async createNotesBulk(userId: string, notesData: Partial<Note>[]): Promise<Note[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    // Validate and prepare notes
    const notesToSave = notesData.map((noteData) => {
      const note = new Note()
      note.title = noteData.title || 'Untitled'
      note.content = noteData.content || ''
      note.user = user
      return note
    })

    return await this.noteRepository.save(notesToSave)
  }

  async readNote(id: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id, user: { id: userId } },
    })
    if (!note) {
      throw new NotFoundException(`Note not found`)
    }
    return note
  }

  async updateNote(
    id: string,
    title: string,
    content: string,
    isPinned: boolean | undefined,
    isDeleted: boolean | undefined,
    userId: string,
  ): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id, user: { id: userId } },
    })
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`)
    }

    note.title = title
    note.content = content
    if (isPinned !== undefined) {
      note.isPinned = isPinned
    }

    if (isDeleted !== undefined) {
      note.isDeleted = isDeleted
    }

    await this.noteRepository.save(note)
    this.logger.log(`Note updated: ${id}`)
    return note
  }

  async deleteNote(id: string, userId: string): Promise<void> {
    const note = await this.noteRepository.findOne({
      where: { id, user: { id: userId } },
    })
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`)
    }

    await this.noteRepository.remove(note)
    this.logger.log(`Note deleted: ${id}`)
  }

  async pinNote(id: string, isPinned: boolean, userId: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id, user: { id: userId } },
    })
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`)
    }

    note.isPinned = isPinned
    await this.noteRepository.save(note)
    this.logger.log(`Note ${isPinned ? 'pinned' : 'unpinned'}: ${id}`)
    return note
  }

  // ================= //
  // BACKUP AND EXPORT //
  // ================= //

  async backupNotes(userId: string, res: Response): Promise<void> {
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
    })
    // const date: string = new Date().toISOString().replace(/[:.]/g, '-')
    const date: string = new Date().toLocaleString()

    if (!notes.length) {
      throw new NotFoundException('No notes found to backup!')
    }

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="notes_backup_${date}.zip"`)

    const archive = archiver('zip', { zlib: { level: 9 } })

    archive.on('error', (err: Error): void => {
      this.logger.error(`Archiving error while backing up notes for user with ID ${userId}:`, err)
      res.status(500).end('An error occurred while creating the backup.')
    })

    archive.pipe(res)

    for (const note of notes) {
      const filename = `${slugify(note.title, { remove: /[*+~.()'"!:@]/g }) || 'untitled'}${note.isDeleted ? '-[TRASHED]' : ''}.md`
      archive.append(note.content || '', { name: filename })
    }

    await archive.finalize()
    this.logger.log(`Notes backup generated for user: ${userId}`)
  }

  // ================ //
  // NOTE SHARING API //
  // ================ //

  async shareNote(noteId: string, recipientEmails: string[], userId: string): Promise<void> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId, user: { id: userId } },
      relations: ['user'],
    })
    if (!note) {
      throw new NotFoundException(`Note with ID "${noteId}" not found`)
    }

    const sender = note.user

    const sharePromises = recipientEmails.map((recipientEmail) => this.handleNoteSharing(note, sender, recipientEmail))

    await Promise.allSettled(sharePromises)
  }

  async copySharedNoteToUser(token: string, userId: string): Promise<void> {
    const shareRecord = await this.getShareRecord(token)

    if (!shareRecord) {
      throw new NotFoundException('Share token not found.')
    }

    if (shareRecord.expiry < new Date()) {
      // await this.deleteShareRecord(token); // Delete expired share token
      throw new NotFoundException('Invalid or expired share token.')
    }

    if (shareRecord.recipientUserId && shareRecord.recipientUserId !== userId) {
      throw new UnauthorizedException('You are not authorized to copy this note document.')
    }

    await this.copyNoteToUser(shareRecord.noteId, userId)

    await this.deleteShareRecord(token)

    this.logger.log(`Note copied to user ${userId} and share token ${token} deleted.`)
  }

  async copyNoteToUser(noteId: string, userId: string): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id: noteId } })
    if (!note) {
      throw new NotFoundException('Note not found.')
    }

    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found.')
    }

    const newNote = this.noteRepository.create({
      title: note.title,
      content: note.content,
      isPinned: note.isPinned,
      user: user,
    })
    await this.noteRepository.save(newNote)
  }

  // Share note to registered users
  async getSharedNoteForUser(token: string, userId: string): Promise<Note> {
    const shareRecord = await this.getShareRecord(token)

    if (!shareRecord || shareRecord.expiry < new Date()) {
      throw new NotFoundException('Invalid or expired share token.')
    }

    if (shareRecord.recipientUserId !== userId) {
      throw new UnauthorizedException('You are not authorized to access this note.')
    }

    const note = await this.noteRepository.findOne({ where: { id: shareRecord.noteId } })
    if (!note) {
      throw new NotFoundException('Note not found.')
    }

    return note
  }

  // Share note to non-registered users
  async getPublicSharedNote(token: string): Promise<Note> {
    const shareRecord = await this.getShareRecord(token)

    if (!shareRecord || shareRecord.expiry < new Date()) {
      throw new NotFoundException('Invalid or expired share token.')
    }

    if (shareRecord.recipientUserId) {
      throw new UnauthorizedException('This note is not available publicly.')
    }

    const note = await this.noteRepository.findOne({ where: { id: shareRecord.noteId } })
    if (!note) {
      throw new NotFoundException('Note not found.')
    }

    return note
  }

  // async getSharedNoteByToken(token: string): Promise<Note> {
  //   this.logger.log(`Getting shared note by token: ${token}`)
  //   const shareRecord = await this.getShareRecord(token)

  //   this.logger.log(`Share record found: ${shareRecord.token}`)

  //   if (!shareRecord || shareRecord.expiry < new Date()) {
  //     throw new NotFoundException('Invalid or expired share token.')
  //   }

  //   const note = await this.noteRepository.findOne({
  //     where: { id: shareRecord.noteId },
  //   })

  //   if (!note) {
  //     throw new NotFoundException('Note not found.')
  //   }
  //   return note
  // }

  async getShareRecord(token: string): Promise<ShareRecord> {
    const shareRecord: ShareRecord = await this.shareRecordRepository.findOne({
      where: { token },
    })

    if (!shareRecord) {
      throw new NotFoundException('Share token not found.')
    }

    return shareRecord
  }

  async saveShareRecord(
    token: string,
    noteId: string,
    expiry: Date,
    senderUserId: string,
    recipientUserId?: string,
  ): Promise<void> {
    const shareRecord: ShareRecord = this.shareRecordRepository.create({
      token,
      noteId,
      expiry,
      senderUserId,
      recipientUserId,
    })

    await this.shareRecordRepository.save(shareRecord)
    this.logger.log(`Share token saved: ${token} for noteId: ${noteId}`)
  }

  async deleteShareRecord(token: string): Promise<void> {
    const shareRecord: ShareRecord = await this.shareRecordRepository.findOne({
      where: { token },
    })

    if (shareRecord) {
      await this.shareRecordRepository.remove(shareRecord)
      this.logger.log(`Share token deleted: ${token}`)
    }
  }
}
