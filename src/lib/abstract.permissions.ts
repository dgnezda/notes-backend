import { PermissionsEnum } from 'enums/permissions.enum'

export abstract class AbstractPermissions {
  // Enforce 'permissions' as readOnly
  get permissions() {
    return this._permissions
  }
  constructor(private _permissions: number = 0) {}
  protected hasPerms = (perms: number) => !!(this._permissions & perms)
}
