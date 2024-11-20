import { IsEnum, IsNotEmpty } from 'class-validator'
import { PermissionsEnum } from 'enums/permissions.enum'

export class UpdatePermissionDto {
  @IsNotEmpty()
  @IsEnum(PermissionsEnum, { each: true })
  permissions: PermissionsEnum[]
}
