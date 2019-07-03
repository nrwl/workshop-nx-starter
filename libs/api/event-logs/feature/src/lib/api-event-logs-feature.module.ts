import { Module } from '@nestjs/common';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';

@Module({
  imports: [ApiEventLogsDataAccessModule],
  controllers: [],
  providers: []
})
export class ApiEventLogsFeatureModule {}
