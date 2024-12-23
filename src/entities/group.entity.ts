import { Entity, ManyToMany, ManyToOne, OneToMany, Column } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Folder } from './folder.entity'

@Entity()
export class Group extends Base {
  @Column()
  name: string

  @ManyToOne(() => User, (user) => user.adminOfGroups, { nullable: true })
  admin: User

  @ManyToMany(() => User, { nullable: true })
  users: User[]

  @ApiProperty({ type: Folder, isArray: true })
  @OneToMany(() => Folder, (folder) => folder.group, { nullable: true })
  folders: Folder[]
}
