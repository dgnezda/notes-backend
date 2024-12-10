import { Module } from '@nestjs/common'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity'
import { Note } from 'entities/note.entity'
import { UsersService } from 'modules/users/users.service'
import { EmailService } from 'modules/email/email.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ShareRecord } from 'entities/share-record.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, User, ShareRecord]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // global: true,
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: `${configService.get<string>('JWT_SECRET_EXPIRES')}s` },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService, UsersService, EmailService],
  exports: [NotesService],
})
export class NotesModule {}
