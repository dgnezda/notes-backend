import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShareRecord } from 'entities/share-record.entity'
import { Repository } from 'typeorm'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class ShareRecordService {
  constructor(
    @InjectRepository(ShareRecord)
    private shareRecordRepository: Repository<ShareRecord>,
  ) {}

  async getShareRecord(token: string): Promise<ShareRecord> {
    return this.shareRecordRepository.findOne({ where: { token } })
  }

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
