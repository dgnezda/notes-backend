import { Module } from '@nestjs/common'
import { FolderPermissionsService } from './folder-permissions.service'
import { FolderPermissionsController } from './folder-permissions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FolderPermission } from 'entities/folder-permission.entity'
import { BaseFolder } from 'entities/base-folder.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FolderPermission, BaseFolder])],
  controllers: [FolderPermissionsController],
  providers: [FolderPermissionsService],
})
export class FolderPermissionsModule {}
