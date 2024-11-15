import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Note } from 'entities/note.entity'
import { User } from 'entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name)

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private validateFilename(filename: string): void {
    const validFilenameRegex = /^[a-zA-Z0-9-_.]+$/
    if (!validFilenameRegex.test(filename)) {
      throw new BadRequestException(
        'Invalid filename. Only alphanumeric characters, hyphens, and underscores are allowed.',
      )
    }
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

  async readNote(id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id }, relations: ['user'] })
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`)
    }

    this.logger.log(`Note read: ${id}`)
    return note
  }

  async updateNote(id: string, title: string, content: string, isPinned?: boolean): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } })
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`)
    }

    note.title = title
    note.content = content
    if (isPinned !== undefined) {
      note.isPinned = isPinned
    }

    await this.noteRepository.save(note)
    this.logger.log(`Note updated: ${id}`)
    return note
  }

  async deleteNote(id: string): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id } })
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`)
    }

    await this.noteRepository.remove(note)
    this.logger.log(`Note deleted: ${id}`)
  }

  async listNotes(): Promise<Note[]> {
    return this.noteRepository.find({ relations: ['user'] })
  }

  async pinNote(id: string, pin: boolean): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } })
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`)
    }

    note.isPinned = pin
    await this.noteRepository.save(note)
    this.logger.log(`Note ${pin ? 'pinned' : 'unpinned'}: ${id}`)
    return note
  }
}
