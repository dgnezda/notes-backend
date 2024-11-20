import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'
import { BaseFolder } from './base-folder.entity'

@Entity()
export class UserFolder extends BaseFolder {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User
}
