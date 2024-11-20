import { IsEmail, IsNotEmpty } from 'class-validator'

export class AddUserToGroupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string
}
