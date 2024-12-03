import { Module } from '@nestjs/common'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity'
import { Note } from 'entities/note.entity'
import { UsersService } from 'modules/users/users.service'
import { EmailService } from 'modules/email/email.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Note, User])],
  controllers: [NotesController],
  providers: [NotesService, UsersService, EmailService, JwtService],
  exports: [NotesService],
})
export class NotesModule {}
