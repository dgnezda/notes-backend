import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'
import { PermissionsEnum } from 'enums/permissions.enum'

export class ShareFolderDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsEnum(PermissionsEnum, { each: true })
  permissions: PermissionsEnum[]
}
