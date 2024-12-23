import { Module } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { GroupsController } from './groups.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'entities/group.entity'
import { User } from 'entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { Folder } from 'entities/folder.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Folder])],
  controllers: [GroupsController],
  providers: [GroupsService, JwtService],
  exports: [GroupsService],
})
export class GroupsModule {}
