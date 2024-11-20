import { IsNotEmpty, IsUUID } from 'class-validator'

export class AssignFolderToGroupDto {
  @IsNotEmpty()
  @IsUUID()
  folderId: string
}
