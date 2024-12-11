import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common'
import { AppVersionService } from './app-version.service'
import { CreateAppVersionDto } from './dto/create-app-version.dto'
import { UpdateAppVersionDto } from './dto/update-app-version.dto'
import { Public } from 'decorators/public.decorator'

@Controller('app-version')
@Public()
export class AppVersionController {
  constructor(private readonly appVersionService: AppVersionService) {}

  @Post()
  create(@Body() createAppVersionDto: CreateAppVersionDto) {
    return this.appVersionService.create(createAppVersionDto)
  }

  @Get(':component')
  findOne(@Param('component') component: string) {
    return this.appVersionService.findOne(component)
  }

  @Patch(':component/:updateType')
  update(@Param('component') component: string, @Param('updateType') updateType: 'major' | 'minor' | 'patch') {
    return this.appVersionService.update(component, updateType)
  }
}
