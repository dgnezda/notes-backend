import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm'
import { User } from './user.entity'
import { PermissionsEnum } from '../enums/permissions.enum'
import { Base } from './base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { BaseFolder } from './base-folder.entity'

@Entity()
export class FolderPermission extends Base {
  @ManyToOne(() => BaseFolder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'folderId' })
  folder: BaseFolder

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User

  @ApiProperty({ enum: PermissionsEnum, isArray: true })
  @Column({ type: 'bigint', default: PermissionsEnum.NONE })
  permissions: number
}
