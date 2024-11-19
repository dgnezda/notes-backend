import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FolderPermissionsService } from './folder-permissions.service';
import { CreateFolderPermissionDto } from './dto/create-folder-permission.dto';
import { UpdateFolderPermissionDto } from './dto/update-folder-permission.dto';

@Controller('folder-permissions')
export class FolderPermissionsController {
  constructor(private readonly folderPermissionsService: FolderPermissionsService) {}

  @Post()
  create(@Body() createFolderPermissionDto: CreateFolderPermissionDto) {
    return this.folderPermissionsService.create(createFolderPermissionDto);
  }

  @Get()
  findAll() {
    return this.folderPermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderPermissionDto: UpdateFolderPermissionDto) {
    return this.folderPermissionsService.update(+id, updateFolderPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderPermissionsService.remove(+id);
  }
}
