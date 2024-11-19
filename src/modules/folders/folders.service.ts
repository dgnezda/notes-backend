import { Injectable } from '@nestjs/common'
import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'

@Injectable()
export class FoldersService {
  // constructor(
  //   @InjectRepository(Folder)
  //   private readonly folderRepository: Repository<Folder>,
  //   @InjectRepository(FolderPermission)
  //   private readonly folderPermissionRepository: Repository<FolderPermission>,
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  // ) {}

  // async createFolder(createFolderDto: CreateFolderDto, userId: string): Promise<Folder> {
  //   const user = await this.userRepository.findOne(userId);
  //   const folder = this.folderRepository.create({
  //     name: createFolderDto.name,
  //     user,
  //   });
  //   await this.folderRepository.save(folder);

  //   // Assign full permissions to the creator
  //   const folderPermission = this.folderPermissionRepository.create({
  //     folder,
  //     user,
  //     permissions: Object.values(Permission),
  //   });
  //   await this.folderPermissionRepository.save(folderPermission);

  //   return folder;
  // }
  create(createFolderDto: CreateFolderDto) {
    return 'This action adds a new folder'
  }

  findAll() {
    return `This action returns all folders`
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`
  }

  remove(id: number) {
    return `This action removes a #${id} folder`
  }
}
