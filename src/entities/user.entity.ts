import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { Exclude } from 'class-transformer'
import { Note } from './note.entity'
import { Group } from './group.entity'
import { FolderPermission } from './folder-permission.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Folder } from './folder.entity'

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
  @JoinTable({
    name: 'user_group',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  groups: Group[]

  @ApiProperty({ type: Folder, isArray: true })
  @OneToMany(() => Folder, (folder) => folder.owner)
  folders: Folder[]

  @ApiProperty({ type: Group, isArray: true })
  @OneToMany(() => Group, (group) => group.admin, { nullable: true })
  adminOfGroups: Group[]

  @ApiProperty({ type: FolderPermission, isArray: true })
  @OneToMany(() => FolderPermission, (fp) => fp.user)
  folderPermissions: FolderPermission[]

  @ApiProperty({ type: User, isArray: true })
  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable({
    name: 'user_friend',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'friend_id', referencedColumnName: 'id' },
  })
  friends: User[]

  @Column({ default: false })
  isEmailConfirmed: boolean
}
