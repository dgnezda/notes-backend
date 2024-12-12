import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { BaseFolder } from './base-folder.entity'

@Entity()
export class Note extends Base {
  @Column()
  title: string

  @Column({ type: 'text', nullable: false })
  content: string

  @Column({ default: false })
  isPinned: boolean

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToOne(() => BaseFolder, (folder) => folder.notes, { nullable: true })
  @JoinColumn({ name: 'folderId' })
  folder: BaseFolder

  @Column({ default: false })
  isDeleted: boolean

  @Column({ default: false })
  isEncrypted: boolean
}
