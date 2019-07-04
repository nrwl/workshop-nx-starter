import { Module } from '@nestjs/common';
import { ApiCommentsDataAccessModule } from '@tuskdesk-suite/api/comments/data-access';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    ApiCommentsDataAccessModule,
    ApiEventLogsDataAccessModule,
    ApiUsersDataAccessModule,
    ApiTicketsDataAccessModule
  ],
  controllers: [CommentsController]
})
export class ApiCommentsFeatureModule {}
