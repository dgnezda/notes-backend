import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common'
import { FoldersService } from './folders.service'
import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'
import { ShareFolderDto } from './dto/share-folder.dto'
import { GetUserId } from 'decorators/get-user-id.decorator'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.guard'
import { ClassSerializerInterceptor } from '@nestjs/common'

@Controller('folders')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto, @GetUserId() userId: string) {
    return this.foldersService.createFolder(createFolderDto, userId)
  }

  @Get()
  findAll(@GetUserId() userId: string) {
    return this.foldersService.findAll(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUserId() userId: string) {
    return this.foldersService.findOne(id, userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto, @GetUserId() userId: string) {
    return this.foldersService.update(id, userId, updateFolderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUserId() userId: string) {
    return this.foldersService.remove(id, userId)
  }

  @Post(':id/share')
  share(@Param('id') folderId: string, @Body() shareFolderDto: ShareFolderDto, @GetUserId() userId: string) {
    return this.foldersService.shareFolder(folderId, userId, shareFolderDto)
  }
}
