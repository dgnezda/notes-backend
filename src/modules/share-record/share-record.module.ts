import { Module } from '@nestjs/common'
import { ShareRecordService } from './share-record.service'
import { ShareRecordController } from './share-record.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShareRecord } from 'entities/share-record.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ShareRecord])],
  controllers: [ShareRecordController],
  providers: [ShareRecordService],
})
export class ShareRecordModule {}
