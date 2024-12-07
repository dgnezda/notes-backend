import { IsNotEmpty, Matches } from 'class-validator'

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string

  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{8,}/, {
    message:
      'Password must have at least one number, lower or uppercase letter, and it has to be 8 characters or longer.',
  })
  newPassword: string
}
