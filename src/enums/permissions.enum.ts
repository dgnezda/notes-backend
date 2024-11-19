export enum Permission {
  CREATE = 'CREATE', // This permission allows to CREATE new notes in shared folders
  READ = 'READ', // This permission allows to READ notes in shared folders
  EDIT = 'EDIT', // This permission allows to EDIT notes in shared folders
  DELETE = 'DELETE', // This permission allows to DELETE notes in shared folders
  SHARE = 'SHARE', // This permission allows to SHARE notes from shared folders to other users outside the shared folder
  EXPORT = 'EXPORT', // This permission allows to EXPORT notes in shared folders
  INVITE = 'INVITE', // This permission allows to INVITE other users to the shared folder
}
