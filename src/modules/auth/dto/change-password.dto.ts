import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches } from 'class-validator'
import { Match } from 'decorators/match.decorator'
import { RegisterUserDto } from './register-user.dto'

export class ChangePasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  userId: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  oldPassword: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{7,}/, {
    message:
      'Password must have at least one number, lower or uppercase letter, and it has to be 8 characters or longer.',
  })
  newPassword: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Match(ChangePasswordDto, (field) => field.newPassword, { message: 'Passwords do not match.' })
  confirmPassword: string
}
