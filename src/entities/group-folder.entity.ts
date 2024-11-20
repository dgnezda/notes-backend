import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { Group } from './group.entity'
import { FolderPermission } from './folder-permission.entity'
import { ApiProperty } from '@nestjs/swagger'
import { BaseFolder } from './base-folder.entity'

@Entity()
export class GroupFolder extends BaseFolder {
  @ManyToOne(() => Group, (group) => group.folders, { nullable: true })
  group: Group

  @ApiProperty({ type: FolderPermission, isArray: true })
  @OneToMany(() => FolderPermission, (fp) => fp.folder)
  folderPermissions: FolderPermission[]
}
