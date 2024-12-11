import { Column, Entity, Index } from 'typeorm'
import { Base } from './base.entity'

@Entity()
export class AppVersion extends Base {
  @Column({ unique: true })
  component: string

  @Column()
  major: number

  @Column()
  minor: number

  @Column()
  patch: number
}
