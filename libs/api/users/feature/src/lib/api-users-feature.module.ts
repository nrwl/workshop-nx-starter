import { Module } from '@nestjs/common';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';
import { UsersController } from './users.controller';

@Module({
  imports: [ApiUsersDataAccessModule, ApiEventLogsDataAccessModule],
  controllers: [UsersController],
  providers: [],
  exports: []
})
export class ApiUsersFeatureModule {}
