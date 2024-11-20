import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FolderPermission } from 'entities/folder-permission.entity'
import { Repository } from 'typeorm'
import { UpdatePermissionDto } from './dto/update-permission.dto'

@Injectable()
export class FolderPermissionsService {
  constructor(
    @InjectRepository(FolderPermission)
    private readonly folderPermissionRepository: Repository<FolderPermission>,
  ) {}

  async updatePermissions(permissionId: string, updatePermissionDto: UpdatePermissionDto): Promise<FolderPermission> {
    const folderPermission = await this.folderPermissionRepository.findOne({
      where: { id: permissionId },
    })
    if (!folderPermission) {
      throw new NotFoundException(`Permission not found`)
    }

    const permissionsValue = updatePermissionDto.permissions.reduce((acc, perm) => acc | perm, 0)

    folderPermission.permissions = permissionsValue

    return this.folderPermissionRepository.save(folderPermission)
  }

  async remove(permissionId: string): Promise<void> {
    const folderPermission = await this.folderPermissionRepository.findOne({
      where: { id: permissionId },
    })
    if (!folderPermission) {
      throw new NotFoundException(`Permission not found`)
    }

    await this.folderPermissionRepository.remove(folderPermission)
  }
}
