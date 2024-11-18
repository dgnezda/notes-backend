import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'

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
}
