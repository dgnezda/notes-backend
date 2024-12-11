import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common'
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

  @Put(':component')
  update(@Param('component') component: string, @Body() updateAppVersionDto: UpdateAppVersionDto) {
    return this.appVersionService.update(component, updateAppVersionDto)
  }
}
