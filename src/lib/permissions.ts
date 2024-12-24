import { PermissionsEnum } from 'enums/permissions.enum'
import { AbstractPermissions } from './abstract.permissions'

export function hasPermission(userPermissions, permission) {
  return (userPermissions & permission) !== 0
}

export class ViewPermissions extends AbstractPermissions {
  get canView() {
    return this.hasPerms(PermissionsEnum.NOTE_VIEW)
  }
}

export class EditPermissions extends AbstractPermissions {
  get canView() {
    return this.hasPerms(PermissionsEnum.NOTE_VIEW)
  }
  get canEdit() {
    return this.hasPerms(PermissionsEnum.NOTE_EDIT)
  }
}

export class AdminPermissions extends AbstractPermissions {
  get canView() {
    return this.hasPerms(PermissionsEnum.NOTE_VIEW)
  }
  get canEdit() {
    return this.hasPerms(PermissionsEnum.NOTE_EDIT)
  }
  get canDelete() {
    return this.hasPerms(PermissionsEnum.NOTE_DELETE)
  }
  get canManageFolder() {
    return this.hasPerms(PermissionsEnum.FOLDER_MANAGE)
  }
  get canManageGroup() {
    return this.hasPerms(PermissionsEnum.GROUP_MANAGE)
  }
}
