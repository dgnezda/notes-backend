import { Column, Entity, JoinTable, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { PermissionsEnum } from '../enums/permissions.enum'

@Entity()
export class Role extends Base {
  @Column()
  name: string

  @ApiProperty({ enum: PermissionsEnum, isArray: true })
  @Column({ type: 'bigint', default: PermissionsEnum.NONE })
  permissions: number
}
