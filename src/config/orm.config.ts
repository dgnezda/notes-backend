import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Note } from 'entities/note.entity'
import { User } from 'entities/user.entity'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

type ConfigType = TypeOrmModuleOptions & PostgresConnectionOptions
type ConnectionOptions = ConfigType

export const ORMConfig = async (configService: ConfigService): Promise<ConnectionOptions> => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PWD'),
  database: configService.get('DATABASE_NAME'),
  // entities: ['**/*.entity.js'], // change to .ts/.js
  // entities: [User, Note],
  autoLoadEntities: true,
  synchronize: true, // true only in development! false for production, otherwise it will overwrite data each time
  ssl: false,
  // extra: {
  //     ssl: {
  //         rejectUnauthorized: false,
  //     }
  // }
})
