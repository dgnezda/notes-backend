import { Module } from '@nestjs/common'
import { FoldersService } from './folders.service'
import { FoldersController } from './folders.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserFolder } from 'entities/user-folder.entity'
import { GroupFolder } from 'entities/group-folder.entity'
import { FolderPermission } from 'entities/folder-permission.entity'
import { BaseFolder } from 'entities/base-folder.entity'
import { User } from 'entities/user.entity'
import { UsersService } from 'modules/users/users.service'
import { GroupsService } from 'modules/groups/groups.service'
import { NotesService } from 'modules/notes/notes.service'
import { Group } from 'entities/group.entity'
import { UsersModule } from 'modules/users/users.module'
import { GroupsModule } from 'modules/groups/groups.module'
import { NotesModule } from 'modules/notes/notes.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([BaseFolder, UserFolder, GroupFolder, FolderPermission, User, Group]),
    UsersModule,
    GroupsModule,
    NotesModule,
  ],
  controllers: [FoldersController],
  providers: [FoldersService, JwtService],
  exports: [FoldersService],
})
export class FoldersModule {}
