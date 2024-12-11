import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateAppVersionDto } from './dto/create-app-version.dto'
import { UpdateAppVersionDto } from './dto/update-app-version.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AppVersion } from 'entities/app-version.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AppVersionService {
  private readonly logger: Logger = new Logger(AppVersionService.name)

  constructor(
    @InjectRepository(AppVersion)
    private appVersionRepository: Repository<AppVersion>,
  ) {}

  async create(createAppVersionDto: CreateAppVersionDto) {
    // Check if the component already exists
    const existingComponent = await this.appVersionRepository.findOne({
      where: { component: createAppVersionDto.component },
    })
    if (existingComponent) {
      this.logger.log(`Component ${createAppVersionDto.component} already exists!`)
      return
    }
    return this.appVersionRepository.save(createAppVersionDto)
  }

  async findOne(component: string) {
    const appVersion = await this.appVersionRepository.findOne({ where: { component } })
    if (!appVersion) {
      throw new NotFoundException(`AppVersion with component '${component}' not found`)
    }
    return appVersion
  }

  async update(component: string, updateType: 'major' | 'minor' | 'patch'): Promise<AppVersion> {
    const appVersion = await this.appVersionRepository.findOne({ where: { component } })
    if (!appVersion) {
      throw new NotFoundException(`AppVersion with component '${component}' not found`)
    }

    switch (updateType) {
      case 'major':
        appVersion.major += 1
        appVersion.minor = 0
        appVersion.patch = 0
        break
      case 'minor':
        appVersion.minor += 1
        appVersion.patch = 0
        break
      case 'patch':
        appVersion.patch += 1
        break
      default:
        throw new BadRequestException(`Invalid update type '${updateType}'`)
    }

    return this.appVersionRepository.save(appVersion)
  }

  remove(id: string) {
    return this.appVersionRepository.delete(id)
  }
}
