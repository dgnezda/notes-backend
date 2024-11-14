import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Exclude } from "class-transformer";
import { Note } from "./note.entity";

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  @Exclude()
  password: string

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[]
}