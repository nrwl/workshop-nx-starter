import { Module } from '@nestjs/common';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { EventLogsController } from './event-logs.controller';

@Module({
  imports: [ApiEventLogsDataAccessModule],
  controllers: [EventLogsController],
  providers: []
})
export class ApiEventLogsFeatureModule {}
