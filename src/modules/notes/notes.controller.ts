import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Req,
  UseGuards,
  Res,
  SetMetadata,
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { Note } from 'entities/note.entity'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.guard'
import { Public } from 'decorators/public.decorator'

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

  @Get('backup')
  async backupNotes(@Req() req: Request, @Res() res: Response): Promise<void> {
    const userId = req.user['id']
    return this.notesService.backupNotes(userId, res)
  }

  @Get(':id([0-9a-fA-F-]{36})')
  async readNote(@Param('id') id: string, @Req() req: Request): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.readNote(id, userId)
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto, @Req() req: Request): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.createNote(createNoteDto.title, createNoteDto.content, userId, createNoteDto.isPinned)
  }

  @Post('bulk')
  async createNotesBulk(@Req() req: Request, @Body() notesData: Partial<Note>[]): Promise<Note[]> {
    const userId = req.user['id']
    return this.notesService.createNotesBulk(userId, notesData)
  }

  @Delete('trash')
  async emptyTrash(@Req() req: Request): Promise<void> {
    const userId = req.user['id']
    return this.notesService.deleteNotesBulk(userId)
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() { title, content, isPinned, isDeleted }: UpdateNoteDto,
    @Req() req: Request,
  ): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.updateNote(id, title, content, isPinned, isDeleted, userId)
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

  @Post(':id/share')
  async shareNote(@Param('id') id: string, @Body('emails') emails: string[], @Req() req: Request): Promise<void> {
    const userId = req.user['id']
    return this.notesService.shareNote(id, emails, userId)
  }

  @Get('shared/:token')
  async getSharedNoteForUser(@Param('token') token: string, @Req() req: Request): Promise<Note> {
    const userId = req.user['id']
    return this.notesService.getSharedNoteForUser(token, userId)
  }

  @Public()
  @Get('public/:token')
  async getPublicSharedNote(@Param('token') token: string): Promise<Note> {
    return this.notesService.getPublicSharedNote(token)
  }

  // @Public()
  @Post('share/:token/copy')
  async copySharedNoteToUser(@Param('token') token: string, @Req() req: Request): Promise<void> {
    const userId = req.user['id']
    return this.notesService.copySharedNoteToUser(token, userId)
  }
}
