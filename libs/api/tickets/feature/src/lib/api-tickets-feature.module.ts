import { Module } from '@nestjs/common';
import { CommentsModule } from '@tuskdesk-suite/api/comments/src';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    ApiTicketsDataAccessModule,
    ApiEventLogsDataAccessModule,
    CommentsModule
  ],
  controllers: [TicketController],
  providers: []
})
export class ApiTicketsFeatureModule {}
