import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class ShareToken {
  @PrimaryColumn()
  token: string

  @Column()
  noteId: string

  @Column()
  expiry: Date
}
