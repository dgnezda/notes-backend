import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateNoteDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  title: string

  @ApiProperty({ required: false })
  @IsString()
  content: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  userId: string

  @ApiProperty({ required: false, default: false })
  @IsNotEmpty()
  @IsBoolean()
  isPinned: boolean
}
