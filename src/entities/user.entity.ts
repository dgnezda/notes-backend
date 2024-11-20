import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { Exclude } from 'class-transformer'
import { Note } from './note.entity'
import { Group } from './group.entity'
import { UserFolder } from './user-folder.entity'
import { FolderPermission } from './folder-permission.entity'
import { ApiProperty } from '@nestjs/swagger'

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

  @ApiProperty({ type: Note, isArray: true })
  @OneToMany(() => Note, (note) => note.user)
  notes: Note[]

  @ApiProperty({ type: Group, isArray: true })
  @ManyToMany(() => Group, { nullable: true })
  @JoinTable()
  groups: Group[]

  @ApiProperty({ type: UserFolder, isArray: true })
  @OneToMany(() => UserFolder, (folder) => folder.user)
  folders: UserFolder[]

  @ApiProperty({ type: Group, isArray: true })
  @OneToMany(() => Group, (group) => group.admin, { nullable: true })
  adminOfGroups: Group[]

  @ApiProperty({ type: FolderPermission, isArray: true })
  @OneToMany(() => FolderPermission, (fp) => fp.user)
  folderPermissions: FolderPermission[]
}
