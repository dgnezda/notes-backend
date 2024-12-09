import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Response } from 'express'
import { Note } from 'entities/note.entity'
import { User } from 'entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import archiver from 'archiver'
import slugify from 'slugify'
import { JwtService } from '@nestjs/jwt'
import { getInternalNoteShareEmail, getExternalNoteShareEmail } from 'lib/getEmailString'
import { EmailService } from 'modules/email/email.service'
import { v4 as uuidv4 } from 'uuid'
import { ShareToken } from 'entities/share-token.entity'

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name)

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ShareToken)
    private shareTokenRepository: Repository<ShareToken>,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

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

  async backupNotes(userId: string, res: Response): Promise<void> {
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
    })
    const date: string = new Date().toISOString().replace(/[:.]/g, '-')

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

  async shareNote(noteId: string, recipientEmails: string[], userId: string): Promise<void> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId, user: { id: userId } },
      relations: ['user'],
    })
    if (!note) {
      throw new NotFoundException(`Note with ID "${noteId}" not found`)
    }

    const sender = note.user

    const sharePromises = recipientEmails.map(async (recipientEmail) => {
      try {
        const recipient: User = await this.userRepository.findOne({
          where: { email: recipientEmail },
        })

        if (recipient) {
          // Check if already friends
          const isFriend = await this.userRepository
            .createQueryBuilder('user')
            .relation(User, 'friends')
            .of(sender)
            .loadMany()
            .then((friends) => friends.some((friend) => friend.id === recipient.id))

          if (!isFriend) {
            // Add each other as friends without loading full entities
            await this.userRepository.createQueryBuilder().relation(User, 'friends').of(sender).add(recipient.id)

            await this.userRepository.createQueryBuilder().relation(User, 'friends').of(recipient).add(sender.id)
          }

          // Share note with existing user
          const newNote: Note = this.noteRepository.create({
            ...note,
            id: undefined, // Ensure a new note is created
            user: recipient,
          })
          await this.noteRepository.save(newNote)

          const sharedNoteLink = `${process.env.APP_URL}/notes/${newNote.id}`
          this.logger.log(`Note shared with user ${recipientEmail}: ${sharedNoteLink}`)

          const emailContent = getInternalNoteShareEmail(note.title, sharedNoteLink, note.user.firstName)

          await this.emailService.sendMail(
            recipientEmail,
            `${note.user.firstName} has shared a Note with you via dotmd.ink!`,
            emailContent,
          )
        } else {
          // New user
          const shareToken = uuidv4()
          const tokenExpiry = new Date()
          tokenExpiry.setDate(tokenExpiry.getDate() + 14) // 14 days
          await this.saveShareToken(shareToken, noteId, tokenExpiry)

          const shareLink = `${process.env.APP_URL}/shared-notes/${shareToken}`
          const emailContent = getExternalNoteShareEmail(note.title, shareLink, note.user.firstName)

          this.logger.log(`Note invitation sent to new user ${recipientEmail} at ${shareLink}`)
          await this.emailService.sendMail(
            recipientEmail,
            `${note.user.firstName} has invited you to view a note via dotmd.ink!`,
            emailContent,
          )
        }
      } catch (error) {
        this.logger.error(`Failed to share note with ${recipientEmail}: ${error.message}`)
      }
    })

    await Promise.allSettled(sharePromises)
  }

  async copyNoteToUser(noteId: string, userId: string): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id: noteId } })
    if (note) {
      const user = await this.userRepository.findOne({ where: { id: userId } })
      const newNote = this.noteRepository.create({
        ...note,
        id: undefined,
        user: user,
      })
      await this.noteRepository.save(newNote)
    }
  }

  async getSharedNoteByToken(token: string): Promise<Note> {
    this.logger.log(`Getting shared note by token: ${token}`)
    const shareRecord = await this.getShareToken(token)

    this.logger.log(`Share record found: ${shareRecord.token}`)

    if (!shareRecord || shareRecord.expiry < new Date()) {
      throw new NotFoundException('Invalid or expired share token.')
    }

    const note = await this.noteRepository.findOne({
      where: { id: shareRecord.noteId },
    })

    if (!note) {
      throw new NotFoundException('Note not found.')
    }
    return note
  }

  private async getShareToken(token: string): Promise<ShareToken> {
    const shareToken = await this.shareTokenRepository.findOne({
      where: { token },
    })

    if (!shareToken) {
      throw new NotFoundException('Share token not found.')
    }

    return shareToken
  }

  private async saveShareToken(token: string, noteId: string, expiry: Date): Promise<void> {
    const shareToken = this.shareTokenRepository.create({
      token,
      noteId,
      expiry,
    })

    await this.shareTokenRepository.save(shareToken)
    this.logger.log(`Share token saved: ${token} for noteId: ${noteId}`)
  }
}
