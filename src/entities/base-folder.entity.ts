import { Entity, Column, OneToMany, TableInheritance } from 'typeorm'
import { Note } from './note.entity'
import { Base } from './base.entity'

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class BaseFolder extends Base {
  @Column()
  name: string

  @OneToMany(() => Note, (note) => note.folder)
  notes: Note[]
}
