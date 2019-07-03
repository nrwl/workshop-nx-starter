import { Module } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { UsersModule } from '@tuskdesk-suite/api/users';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [EventLogService],
  exports: [EventLogService]
})
export class EventLogModule {}
