import { Controller, Get } from '@nestjs/common'
import { ShareRecordService } from './share-record.service'
import { ShareRecord } from 'entities/share-record.entity'

@Controller('share-record')
export class ShareRecordController {
  constructor(private readonly shareRecordService: ShareRecordService) {}

  @Get(':token')
  async getShareRecord(token: string): Promise<ShareRecord> {
    return this.shareRecordService.getShareRecord(token)
  }
}
