import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

export class CreateAppVersionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  component: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  major: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  minor: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  patch: number
}
