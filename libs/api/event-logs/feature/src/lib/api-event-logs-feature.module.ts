import { Module } from '@nestjs/common';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { EventLogsController } from './event-logs.controller';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';

@Module({
  imports: [ApiEventLogsDataAccessModule, ApiUsersDataAccessModule],
  controllers: [EventLogsController],
  providers: []
})
export class ApiEventLogsFeatureModule {}
