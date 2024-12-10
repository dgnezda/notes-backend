import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity'
import { Note } from 'entities/note.entity'
import { NotesService } from 'modules/notes/notes.service'
import { FolderPermission } from 'entities/folder-permission.entity'
import { EmailService } from 'modules/email/email.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ShareRecord } from 'entities/share-record.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Note, FolderPermission, ShareRecord]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, NotesService, EmailService],
  exports: [UsersService],
})
export class UsersModule {}
