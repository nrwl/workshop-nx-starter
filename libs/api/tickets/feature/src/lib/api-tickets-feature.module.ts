import { Module } from '@nestjs/common';
import { ApiCommentsDataAccessModule } from '@tuskdesk-suite/api/comments/data-access';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    ApiTicketsDataAccessModule,
    ApiEventLogsDataAccessModule,
    ApiCommentsDataAccessModule
  ],
  controllers: [TicketController],
  providers: []
})
export class ApiTicketsFeatureModule {}
