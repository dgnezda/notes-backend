import { Module } from '@nestjs/common'
import { ShareRecordCleanupService } from './share-record-cleanup.service'
import { ShareRecordCleanupController } from './share-record-cleanup.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShareRecord } from 'entities/share-record.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ShareRecord])],
  controllers: [ShareRecordCleanupController],
  providers: [ShareRecordCleanupService],
})
export class ShareRecordCleanupModule {}
