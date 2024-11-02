import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class Note extends Base {
  @Column({ unique: true })
  filename: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isPinned: boolean;

  // @Column()
  // images?: string[];
}