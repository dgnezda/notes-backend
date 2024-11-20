export enum RoleEnum {
  ADMIN = 'ADMIN', // This role has all permissions
  EDITOR = 'EDITOR', // This role has all permissions except DELETE, INVITE
  USER = 'USER', // This role has CREATE, EDIT, READ, EXPORT permissions
  GUEST = 'GUEST', // This role has only READ permission
}
