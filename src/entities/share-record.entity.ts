import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class ShareRecord {
  @PrimaryColumn()
  token: string

  @Column()
  noteId: string

  @Column()
  expiry: Date
}
