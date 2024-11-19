import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { Folder } from './folder.entity'

@Entity()
export class Group extends Base {
  @ManyToOne(() => User, (user) => user.adminOfGroups, { nullable: true })
  admin: User

  @ManyToMany(() => User, (user) => user.groups, { nullable: true })
  users: User[]

  @ManyToMany(() => Folder, (folder) => folder.groups, { nullable: true })
  folders: Folder[]
}
