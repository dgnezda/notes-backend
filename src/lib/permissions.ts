import { PermissionsEnum } from 'enums/permissions.enum'
import { AbstractPermissions } from './abstract.permissions'

export class ViewPermissions extends AbstractPermissions {
  get canViewDocuments() {
    return this.hasPerms(PermissionsEnum.VIEW_NOTES)
  }
  get canViewPermissions() {
    return this.hasPerms(PermissionsEnum.VIEW_PERMISSIONS)
  }
  get canViewReports() {
    return this.hasPerms(PermissionsEnum.VIEW_CHANGELOG)
  }
  get canViewUsers() {
    return this.hasPerms(PermissionsEnum.VIEW_USERS)
  }
  get canViewPinned() {
    return this.hasPerms(PermissionsEnum.VIEW_PINNED)
  }
}

export class GroupPermissions extends AbstractPermissions {
  get canAddFolder() {
    return this.hasPerms(PermissionsEnum.GROUP_FOLDER_ADD)
  }
  get canAddNote() {
    return this.hasPerms(PermissionsEnum.GROUP_NOTE_ADD)
  }
  get canInviteUser() {
    return this.hasPerms(PermissionsEnum.GROUP_USER_INVITE)
  }
  get canRemoveUser() {
    return this.hasPerms(PermissionsEnum.GROUP_USER_REMOVE)
  }
}

export class NotePermissions extends AbstractPermissions {
  get canView() {
    return this.hasPerms(PermissionsEnum.VIEW_NOTES)
  }
  get canEdit() {
    return this.hasPerms(PermissionsEnum.NOTE_UPDATE)
  }
  get canDelete() {
    return this.hasPerms(PermissionsEnum.NOTE_DELETE)
  }
  get canMove() {
    return this.hasPerms(PermissionsEnum.NOTE_MOVE)
  }
  get canCopy() {
    return this.hasPerms(PermissionsEnum.NOTE_COPY)
  }
  get canSearch() {
    return this.hasPerms(PermissionsEnum.NOTE_SEARCH)
  }
  get canDownload() {
    return this.hasPerms(PermissionsEnum.NOTE_DOWNLOAD)
  }
  get canDownloadBulk() {
    return this.hasPerms(PermissionsEnum.NOTE_DOWNLOAD_BULK)
  }
  get canPermanentDelete() {
    return this.hasPerms(PermissionsEnum.NOTE_PERMANENT_DELETE)
  }
}
