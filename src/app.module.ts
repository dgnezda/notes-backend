import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { NotesModule } from './modules/notes/notes.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { configValidationSchema } from './config/schema.config'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { EmailModule } from './modules/email/email.module'
import { DatabaseModule } from 'database/database.module'
import { FoldersModule } from './modules/folders/folders.module'
import { GroupsModule } from './modules/groups/groups.module'
import { FolderPermissionsModule } from './modules/folder-permissions/folder-permissions.module'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.ENV || 'development'}`],
      validationSchema: configValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DatabaseModule,
    NotesModule,
    AuthModule,
    UsersModule,
    EmailModule,
    FoldersModule,
    GroupsModule,
    FolderPermissionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
