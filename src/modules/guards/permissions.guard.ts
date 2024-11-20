import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { PermissionsEnum } from 'enums/permissions.enum'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private requiredPermission: PermissionsEnum) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const userPermissions = request.user.permissions
    return (userPermissions & this.requiredPermission) !== 0
  }
}

// Usage in a controller
// @UseGuards(new PermissionsGuard(PermissionsEnum.NOTE_UPDATE))
