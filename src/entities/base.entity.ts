import { Expose } from 'class-transformer'
import { IsUUID } from 'class-validator'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class Base {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Expose()
  id: string

  @CreateDateColumn()
  @Expose()
  createdAt: Date

  @UpdateDateColumn()
  @Expose()
  modifiedAt: Date
}