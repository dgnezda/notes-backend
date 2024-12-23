import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'entities/user.entity'
import { Repository } from 'typeorm'
import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'
import { FolderPermission } from 'entities/folder-permission.entity'
import { ShareFolderDto } from './dto/share-folder.dto'
import { PermissionsEnum } from 'enums/permissions.enum'
import { Folder } from 'entities/folder.entity'

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FolderPermission)
    private readonly folderPermissionRepository: Repository<FolderPermission>,
  ) {}

  async createFolder(createFolderDto: CreateFolderDto, userId: string): Promise<Folder> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`User not found`)
    }

    const folder = this.folderRepository.create({
      name: createFolderDto.name,
      owner: { id: userId },
      notes: [],
      group: null,
      folderPermissions: [],
    })

    const savedFolder = await this.folderRepository.save(folder)

    // Assign full permissions to the creator
    const folderPermission = this.folderPermissionRepository.create({
      folder: savedFolder,
      user: user,
      permissions: PermissionsEnum.ALL, // Assuming ALL represents full permissions
    })
    await this.folderPermissionRepository.save(folderPermission)

    return savedFolder
  }

  async findAll(userId: string): Promise<Folder[]> {
    return this.folderRepository.find({
      where: { owner: { id: userId } },
      relations: ['user'],
    })
  }

  async findOne(id: string, userId: string): Promise<Folder> {
    const folder = await this.folderRepository.findOne({
      where: { id },
      relations: ['user'],
    })
    if (!folder) {
      throw new NotFoundException(`Folder not found`)
    }
    if (folder.owner.id !== userId) {
      throw new ForbiddenException(`You do not have access to this folder`)
    }
    return folder
  }

  async update(id: string, userId: string, updateFolderDto: UpdateFolderDto): Promise<Folder> {
    const folder = await this.findOne(id, userId)

    Object.assign(folder, updateFolderDto)

    return this.folderRepository.save(folder)
  }

  async remove(folderId: string, userId: string): Promise<void> {
    const folder = await this.findOne(folderId, userId)
    await this.folderRepository.remove(folder)
  }

  async shareFolder(folderId: string, userId: string, shareFolderDto: ShareFolderDto): Promise<void> {
    const folder = await this.findOne(folderId, userId)

    const recipient = await this.userRepository.findOne({
      where: { email: shareFolderDto.email },
    })
    if (!recipient) {
      throw new NotFoundException(`User with email ${shareFolderDto.email} not found`)
    }

    // Check if the recipient already has permissions
    const existingPermission = await this.folderPermissionRepository.findOne({
      where: { folder, user: recipient },
    })
    if (existingPermission) {
      throw new BadRequestException(`User already has permissions for this folder`)
    }

    const permissionsValue = shareFolderDto.permissions.reduce((acc, perm) => acc | perm, 0)

    const folderPermission = this.folderPermissionRepository.create({
      folder,
      user: recipient,
      permissions: permissionsValue,
    })

    await this.folderPermissionRepository.save(folderPermission)

    // Optionally, send an email notification to the recipient
  }
}
