import { Module } from '@nestjs/common';
import { EventLogService } from './event-log.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EventLogService],
  exports: [EventLogService]
})
export class ApiEventLogsDataAccessModule {}
