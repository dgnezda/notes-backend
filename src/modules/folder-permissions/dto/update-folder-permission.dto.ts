import { PartialType } from '@nestjs/swagger';
import { CreateFolderPermissionDto } from './create-folder-permission.dto';

export class UpdateFolderPermissionDto extends PartialType(CreateFolderPermissionDto) {}
