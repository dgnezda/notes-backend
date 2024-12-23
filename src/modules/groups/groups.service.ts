import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Group } from 'entities/group.entity'
import { User } from 'entities/user.entity'
import { Repository } from 'typeorm'
import { CreateGroupDto } from './dto/create-group.dto'
import { AddUserToGroupDto } from './dto/add-user-to-group.dto'
import { AssignFolderToGroupDto } from './dto/assign-folder-to-group.dto'
import { Folder } from 'entities/folder.entity'

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto, adminId: string): Promise<Group> {
    const admin = await this.userRepository.findOne({
      where: { id: adminId },
    })
    if (!admin) {
      throw new NotFoundException(`Admin user not found`)
    }

    const group: Partial<Group> = this.groupRepository.create({
      name: createGroupDto.name,
      admin: admin,
      users: [admin],
    })

    const savedGroup: Group = await this.groupRepository.save(group)
    return savedGroup
  }

  async addUserToGroup(groupId: string, adminId: string, addUserToGroupDto: AddUserToGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['admin', 'users'],
    })
    if (!group) {
      throw new NotFoundException(`Group not found`)
    }

    if (group.admin.id !== adminId) {
      throw new ForbiddenException(`Only the group admin can add users`)
    }

    const user = await this.userRepository.findOne({
      where: { email: addUserToGroupDto.email },
    })
    if (!user) {
      throw new NotFoundException(`User not found`)
    }

    if (group.users.some((u) => u.id === user.id)) {
      throw new BadRequestException(`User is already a member of the group`)
    }

    group.users.push(user)
    return this.groupRepository.save(group)
  }

  async assignFolderToGroup(
    groupId: string,
    adminId: string,
    assignFolderDto: AssignFolderToGroupDto,
  ): Promise<Folder> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['admin'],
    })
    if (!group) {
      throw new NotFoundException(`Group not found`)
    }

    if (group.admin.id !== adminId) {
      throw new ForbiddenException(`Only the group admin can assign folders`)
    }

    const folder = await this.folderRepository.findOne({
      where: { id: assignFolderDto.folderId },
    })
    if (!folder) {
      throw new NotFoundException(`Folder not found`)
    }

    folder.group = group

    return this.folderRepository.save(folder)
  }
}
