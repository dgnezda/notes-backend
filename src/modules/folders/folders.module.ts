import { Module } from '@nestjs/common'
import { FoldersService } from './folders.service'
import { FoldersController } from './folders.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FolderPermission } from 'entities/folder-permission.entity'
import { Folder } from 'entities/folder.entity'
import { User } from 'entities/user.entity'
import { Group } from 'entities/group.entity'
import { UsersModule } from 'modules/users/users.module'
import { GroupsModule } from 'modules/groups/groups.module'
import { NotesModule } from 'modules/notes/notes.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Folder, FolderPermission, User, Group]), UsersModule, GroupsModule, NotesModule],
  controllers: [FoldersController],
  providers: [FoldersService, JwtService],
  exports: [FoldersService],
})
export class FoldersModule {}
