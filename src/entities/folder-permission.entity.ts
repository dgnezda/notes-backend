import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm'
import { User } from './user.entity'
import { PermissionsEnum } from '../enums/permissions.enum'
import { Base } from './base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Folder } from './folder.entity'

@Entity()
export class FolderPermission extends Base {
  @ManyToOne(() => Folder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'folderId' })
  folder: Folder

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User

  @ApiProperty({ enum: PermissionsEnum, isArray: true })
  @Column({ type: 'bigint', default: PermissionsEnum.NONE })
  permissions: number
}
