import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

export class UpdateAppVersionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  component: string

  @ApiProperty({ required: false })
  @IsInt()
  @Min(0)
  major: number

  @ApiProperty({ required: false })
  @IsInt()
  @Min(0)
  minor: number

  @ApiProperty({ required: false })
  @IsInt()
  @Min(0)
  patch: number
}
