import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { NotesModule } from './modules/notes/notes.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { configValidationSchema } from './config/schema.config'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { EmailModule } from './modules/email/email.module'
import { DatabaseModule } from 'database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.ENV || 'development'}`],
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    NotesModule,
    AuthModule,
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
