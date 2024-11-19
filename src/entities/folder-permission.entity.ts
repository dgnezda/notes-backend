import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'
import { User } from './user.entity'
import { Folder } from './folder.entity'
import { Permission } from '../enums/permissions.enum'

@Entity()
export class FolderPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Folder, (folder) => folder.folderPermissions)
  folder: Folder

  @ManyToOne(() => User, (user) => user.folderPermissions)
  user: User

  @Column('simple-array')
  permissions: Permission[]
}
