import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { Note } from './note.entity'
import { User } from './user.entity'
import { Group } from './group.entity'
import { FolderPermission } from './folder-permission.entity'

@Entity()
export class Folder extends Base {
  @Column()
  name: string

  @OneToMany(() => Note, (note) => note.folder, { nullable: true })
  notes: Note[]

  @ManyToOne(() => User, (user) => user.folders)
  user: User

  @ManyToMany(() => Group, (group) => group.folders, { nullable: true })
  groups: Group[]

  @OneToMany(() => FolderPermission, (fp) => fp.folder)
  folderPermissions: FolderPermission[]
}
