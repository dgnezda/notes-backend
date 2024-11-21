import { Body, Controller, Delete, Get, Param, Post, Put, Patch, Req, UseGuards } from '@nestjs/common'
import { NotesService } from './notes.service'
import { Note } from 'entities/note.entity'
import { create } from 'domain'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Request } from 'express'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.guard'

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async listNotes(@Req() req: Request): Promise<Note[]> {
    const userId = req.user['id']
    const notes = await this.notesService.listNotes(userId)
    for (let note of notes) {
      if (note.content === '' && (note.title === 'New Note' || note.title === '')) {
        await this.notesService.deleteNote(note.id, userId)
      }
    }
    return this.notesService.listNotes(userId)
  }

  // @Get('user/:userId')
  // async listNotesByUser(@Param('userId') userId: string): Promise<Note[]> {
  //   return this.notesService.listNotesByUser(userId)
  // }

  @Get(':id')
  async readNote(@Param('id') id: string, @Req() req: Request): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.readNote(id, userId)
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto, @Req() req: Request): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.createNote(createNoteDto.title, createNoteDto.content, userId, createNoteDto.isPinned)
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() { title, content, isPinned }: UpdateNoteDto,
    @Req() req: Request,
  ): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.updateNote(id, title, content, isPinned, userId)
  }

  @Patch(':id/pin')
  async pinNote(@Param('id') id: string, @Body('isPinned') isPinned: boolean, @Req() req: Request): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.pinNote(id, isPinned, userId)
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string, @Req() req: Request): Promise<void> {
    const userId = req.user['id']
    return this.notesService.deleteNote(id, userId)
  }
}
