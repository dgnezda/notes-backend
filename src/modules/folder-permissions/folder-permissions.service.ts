import { Injectable } from '@nestjs/common';
import { CreateFolderPermissionDto } from './dto/create-folder-permission.dto';
import { UpdateFolderPermissionDto } from './dto/update-folder-permission.dto';

@Injectable()
export class FolderPermissionsService {
  create(createFolderPermissionDto: CreateFolderPermissionDto) {
    return 'This action adds a new folderPermission';
  }

  findAll() {
    return `This action returns all folderPermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folderPermission`;
  }

  update(id: number, updateFolderPermissionDto: UpdateFolderPermissionDto) {
    return `This action updates a #${id} folderPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} folderPermission`;
  }
}
