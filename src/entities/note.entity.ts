import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { Folder } from './folder.entity'

@Entity()
export class Note extends Base {
  @Column()
  title: string

  @Column({ type: 'text', nullable: false })
  content: string

  @Column({ default: false })
  isPinned: boolean

  @ManyToOne(() => User, (user) => user.notes)
  user: User

  @ManyToOne(() => Folder, (folder) => folder.notes, { nullable: true })
  folder: Folder
}
