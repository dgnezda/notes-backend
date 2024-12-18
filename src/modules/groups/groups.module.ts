import { Module } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { GroupsController } from './groups.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Group } from 'entities/group.entity'
import { User } from 'entities/user.entity'
import { GroupFolder } from 'entities/group-folder.entity'
import { UserFolder } from 'entities/user-folder.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, GroupFolder, UserFolder])],
  controllers: [GroupsController],
  providers: [GroupsService, JwtService],
  exports: [GroupsService],
})
export class GroupsModule {}
