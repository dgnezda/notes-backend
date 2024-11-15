import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { Match } from 'decorators/match.decorator'
import { Note } from 'entities/note.entity'

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  firstName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, {
    message:
      'Password must be at least 8 characters long and have at least one number, one lowercase letter, one uppercase letter, and one special character.',
  })
  password: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Match(CreateUserDto, (field) => field.password, { message: 'Passwords do not match.' })
  confirmPassword: string

  @ApiProperty({ required: false })
  @IsOptional()
  notes?: Note[]
}
