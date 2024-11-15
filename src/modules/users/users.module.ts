import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity'
import { Note } from 'entities/note.entity'
import { NotesService } from 'modules/notes/notes.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Note])],
  controllers: [UsersController],
  providers: [UsersService, NotesService],
  exports: [UsersService],
})
export class UsersModule {}
