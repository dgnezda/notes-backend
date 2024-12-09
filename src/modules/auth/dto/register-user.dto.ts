import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class RegisterUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  firstName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  lastName?: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must have at least one number, lower or uppercase letter, and it has to be longer than 5 characters.',
  })
  password: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Match(RegisterUserDto, (field) => field.password, { message: 'Passwords do not match.' })
  confirmPassword: string

  @ApiProperty({ required: false })
  @IsOptional()
  token?: string
}
