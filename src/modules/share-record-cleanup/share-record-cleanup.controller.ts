import { Controller } from '@nestjs/common';
import { ShareRecordCleanupService } from './share-record-cleanup.service';

@Controller('share-record-cleanup')
export class ShareRecordCleanupController {
  constructor(private readonly shareRecordCleanupService: ShareRecordCleanupService) {}
}
