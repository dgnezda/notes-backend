import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { CreateGroupDto } from './dto/create-group.dto'
import { GetUserId } from 'decorators/get-user-id.decorator'
import { JwtAuthGuard } from 'modules/auth/guards/jwt.guard'
import { AddUserToGroupDto } from './dto/add-user-to-group.dto'
import { AssignFolderToGroupDto } from './dto/assign-folder-to-group.dto'

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @GetUserId() adminId: string) {
    return this.groupsService.createGroup(createGroupDto, adminId)
  }

  @Post(':id/users')
  addUser(@Param('id') groupId: string, @Body() addUserDto: AddUserToGroupDto, @GetUserId() adminId: string) {
    return this.groupsService.addUserToGroup(groupId, adminId, addUserDto)
  }

  @Post(':id/folders')
  assignFolder(
    @Param('id') groupId: string,
    @Body() assignFolderDto: AssignFolderToGroupDto,
    @GetUserId() adminId: string,
  ) {
    return this.groupsService.assignFolderToGroup(groupId, adminId, assignFolderDto)
  }
}
