import { Module } from '@nestjs/common';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access/src';
import { EventLogService } from './event-log.service';

@Module({
  imports: [ApiUsersDataAccessModule],
  controllers: [],
  providers: [EventLogService],
  exports: [EventLogService]
})
export class ApiEventLogsDataAccessModule {}
