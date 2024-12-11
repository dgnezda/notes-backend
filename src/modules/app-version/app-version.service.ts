import { Injectable, Logger, NotFoundException } from '@nestjs/common'
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

  create(createAppVersionDto: CreateAppVersionDto) {
    // Check if the component already exists
    const existingComponent = this.appVersionRepository.findOne({ where: { component: createAppVersionDto.component } })
    if (existingComponent) {
      this.logger.log(`Component ${createAppVersionDto.component} already exists!`)
      return
    }
    return this.appVersionRepository.save(createAppVersionDto)
  }

  findOne(component: string) {
    return this.appVersionRepository.findOne({ where: { component } })
  }

  async update(component: string, updateAppVersionDto: UpdateAppVersionDto) {
    const definedFields = Object.fromEntries(
      Object.entries(updateAppVersionDto).filter(([_, value]) => value !== undefined),
    )
    this.logger.log(`Updating app version for component: ${component} to ${JSON.stringify(definedFields)}`)

    // return this.appVersionRepository.update({ component }, definedFields)
    const result = await this.appVersionRepository.update({ component }, definedFields)

    if (result.affected === 0) {
      throw new NotFoundException(`AppVersion with component '${component}' not found`)
    }

    return this.appVersionRepository.findOne({ where: { component } })
  }

  remove(id: string) {
    return this.appVersionRepository.delete(id)
  }
}
