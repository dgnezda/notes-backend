import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { Note } from './note.entity'
import { Base } from './base.entity'
import { User } from './user.entity'
import { Group } from './group.entity'
import { ApiProperty } from '@nestjs/swagger'
import { FolderPermission } from './folder-permission.entity'

@Entity()
export abstract class Folder extends Base {
  @Column()
  name: string

  @OneToMany(() => Note, (note) => note.folder)
  notes: Note[]

  @ManyToOne(() => User, (user) => user.folders, { nullable: true })
  owner: User

  @Column({ default: false })
  isPinned: boolean

  @ManyToOne(() => Group, (group) => group.folders, { nullable: true })
  group: Group

  @ApiProperty({ type: FolderPermission, isArray: true })
  @OneToMany(() => FolderPermission, (fp) => fp.folder)
  folderPermissions: FolderPermission[]
}
