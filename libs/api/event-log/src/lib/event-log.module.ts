import { Module } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';

@Module({
  imports: [ApiUsersDataAccessModule],
  controllers: [],
  providers: [EventLogService],
  exports: [EventLogService]
})
export class EventLogModule {}
