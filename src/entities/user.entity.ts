import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { Exclude } from 'class-transformer'
import { Note } from './note.entity'
import { Group } from './group.entity'
import { Folder } from './folder.entity'
import { FolderPermission } from './folder-permission.entity'

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  @Exclude()
  password: string

  @OneToMany(() => Note, (note) => note.user, { nullable: true })
  notes: Note[]

  @ManyToMany(() => Group, (group) => group.users, { nullable: true })
  groups: Group[]

  @OneToMany(() => Folder, (folder) => folder.user, { nullable: true })
  folders: Folder[]

  @OneToMany(() => Group, (group) => group.admin, { nullable: true })
  adminOfGroups: Group[]

  @OneToMany(() => FolderPermission, (fp) => fp.user)
  folderPermissions: FolderPermission[]
}
