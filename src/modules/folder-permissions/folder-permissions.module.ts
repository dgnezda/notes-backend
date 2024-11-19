import { Module } from '@nestjs/common'
import { FolderPermissionsService } from './folder-permissions.service'
import { FolderPermissionsController } from './folder-permissions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FolderPermission } from 'entities/folder-permission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FolderPermission])],
  controllers: [FolderPermissionsController],
  providers: [FolderPermissionsService],
})
export class FolderPermissionsModule {}
