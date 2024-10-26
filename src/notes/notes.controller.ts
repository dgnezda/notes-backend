import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async listNotes() {
    return this.notesService.listNotes();
  }

  @Get(':filename')
  async readNote(@Param('filename') filename: string) {
    return this.notesService.readNote(filename);
  }

  @Post()
  async createNote(
    @Body('filename') filename: string,
    @Body('content') content: string
  ) {
    return this.notesService.createNote(filename, content);
  }

  @Put(':filename')
  async updateNote(
    @Param('filename') filename: string,
    @Body('content') content: string
  ) {
    return this.notesService.updateNote(filename, content);
  }

  @Delete(':filename')
  async deleteNote(@Param('filename') filename: string) {
    return this.notesService.deleteNote(filename);
  }
}
