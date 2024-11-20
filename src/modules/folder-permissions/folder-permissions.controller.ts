import { Controller, Patch, Param, Body, Delete, UseGuards } from '@nestjs/common'
import { FolderPermissionsService } from './folder-permissions.service'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.guard'

@Controller('folder-permissions')
@UseGuards(JwtAuthGuard)
export class FolderPermissionsController {
  constructor(private readonly folderPermissionsService: FolderPermissionsService) {}

  @Patch(':id')
  update(@Param('id') permissionId: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.folderPermissionsService.updatePermissions(permissionId, updatePermissionDto)
  }

  @Delete(':id')
  remove(@Param('id') permissionId: string) {
    return this.folderPermissionsService.remove(permissionId)
  }
}
