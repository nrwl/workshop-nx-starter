import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiCommentsDataAccessModule } from '@tuskdesk-suite/api/comments/data-access';

@Module({
  imports: [
    ApiUsersDataAccessModule,
    ApiEventLogsDataAccessModule,
    ApiCommentsDataAccessModule
  ],
  controllers: [],
  providers: [TicketService],
  exports: [TicketService]
})
export class ApiTicketsDataAccessModule {}
