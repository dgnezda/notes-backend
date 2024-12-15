import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShareRecord } from 'entities/share-record.entity'
import { Repository } from 'typeorm'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class ShareRecordCleanupService {
  constructor(
    @InjectRepository(ShareRecord)
    private shareRecordRepository: Repository<ShareRecord>,
  ) {}

  // Remove expired share records every day at midnight
  @Cron('0 0 * * *')
  async removeExpiredShareRecords(): Promise<void> {
    const now = new Date()
    await this.shareRecordRepository
      .createQueryBuilder()
      .delete()
      .from(ShareRecord)
      .where('expiry < :now', { now })
      .execute()
  }
}
