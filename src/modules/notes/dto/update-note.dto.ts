import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateNoteDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  title?: string

  @ApiProperty({ required: false })
  @IsString()
  content?: string

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBoolean()
  isPinned?: boolean

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBoolean()
  isDeleted?: boolean
}
