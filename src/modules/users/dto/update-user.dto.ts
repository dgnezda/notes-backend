import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, Matches, ValidateIf } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  firstName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  lastName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ required: false })
  @IsOptional()
  avatar?: string

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.password && o.password.length > 0)
  @IsOptional()
  @Matches(/^(?=.*\d)[A-Za-z._-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{7,}/, {
    message:
      'Password must have at least one number, one lowercase, one uppercase letter, one symbol, and it has to at least 8 characters long.',
  })
  password?: string

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.confirm_password && o.confirm_password.length > 0)
  @IsOptional()
  @Match(UpdateUserDto, (u) => u.password, { message: 'Passwords do not match.' })
  confirmPassword?: string

  @ApiProperty({ required: false })
  @IsOptional()
  isEmailConfirmed?: boolean
}
