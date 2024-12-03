import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt.guard'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { NotesService } from '../notes/notes.service'
import { NotesModule } from '../notes/notes.module'

@Module({
  imports: [
    ConfigModule, // Import ConfigModule here
    UsersModule,
    NotesModule,
    // PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get<string>('JWT_SECRET_EXPIRES')}s` },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // NotesService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  exports: [AuthService],
})
export class AuthModule {}

// @Module({
//   imports: [
//     ConfigModule,
//     UsersModule,
//     PassportModule,
//     JwtModule.register({
//       global: true,
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: `${process.env.JWT_SECRET_EXPIRES}s` },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [
//     AuthService,
//     LocalStrategy,
//     JwtStrategy,
//     {
//       provide: APP_GUARD,
//       useClass: JwtAuthGuard,
//     },
//   ],
//   exports: [AuthService],
// })
// export class AuthModule {}
