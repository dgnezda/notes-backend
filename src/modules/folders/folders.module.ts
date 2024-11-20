import { Module } from '@nestjs/common'
import { FoldersService } from './folders.service'
import { FoldersController } from './folders.controller'
import { UserFolder } from 'entities/user-folder.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupFolder } from 'entities/group-folder.entity'
import { FolderPermission } from 'entities/folder-permission.entity'
import { BaseFolder } from 'entities/base-folder.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BaseFolder, UserFolder, GroupFolder, FolderPermission])],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
