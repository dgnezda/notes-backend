import { Entity, ManyToMany, ManyToOne, OneToMany, Column } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { GroupFolder } from './group-folder.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Group extends Base {
  @Column()
  name: string

  @ManyToOne(() => User, (user) => user.adminOfGroups, { nullable: true })
  admin: User

  @ManyToMany(() => User, { nullable: true })
  users: User[]

  @ApiProperty({ type: GroupFolder, isArray: true })
  @OneToMany(() => GroupFolder, (folder) => folder.group, { nullable: true })
  folders: GroupFolder[]
}
