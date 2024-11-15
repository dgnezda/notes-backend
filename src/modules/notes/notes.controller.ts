import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common'
import { NotesService } from './notes.service'
import { Note } from 'entities/note.entity'
import { create } from 'domain'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async listNotes(): Promise<Note[]> {
    return this.notesService.listNotes()
  }

  @Get('user/:userId')
  async listNotesByUser(@Param('userId') userId: string): Promise<Note[]> {
    return this.notesService.listNotesByUser(userId)
  }

  @Get(':id')
  async readNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.readNote(id)
  }

  @Post()
  async createNote(@Body() { title, content, userId, isPinned }: CreateNoteDto): Promise<Note> {
    return this.notesService.createNote(title, content, userId, isPinned)
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() { title, content, isPinned }: UpdateNoteDto): Promise<Note> {
    return this.notesService.updateNote(id, title, content, isPinned)
  }

  @Patch(':id/pin')
  async pinNote(@Param('id') id: string, @Body('isPinned') isPinned: boolean): Promise<Note> {
    return this.notesService.pinNote(id, isPinned)
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<void> {
    return this.notesService.deleteNote(id)
  }
}
