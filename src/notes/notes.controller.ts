import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
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
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('isPinned') isPinned: boolean = false
  ) {
    await this.notesService.createNote(filename, title, content);
    if (isPinned) {
      await this.notesService.pinNote(filename, true); // Set the initial pin state if specified
    }
    return { message: `Note "${filename}" created successfully.` };
  }

  @Put(':filename')
  async updateNote(
    @Param('filename') filename: string,
    @Body('content') content: string,
    @Body('isPinned') isPinned?: boolean
  ) {
    await this.notesService.updateNote(filename, content, isPinned);
    return { message: `Note "${filename}" updated successfully.` };
  }

  @Patch(':filename/pin')
  async pinNote(
    @Param('filename') filename: string,
    @Body('isPinned') isPinned: boolean
  ) {
    await this.notesService.pinNote(filename, isPinned);
    return { message: `Note "${filename}" ${isPinned ? 'pinned' : 'unpinned'} successfully.` };
  }

  @Delete(':filename')
  async deleteNote(@Param('filename') filename: string) {
    await this.notesService.deleteNote(filename);
    return { message: `Note "${filename}" deleted successfully.` };
  }
}
