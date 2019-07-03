import { Module } from '@nestjs/common';
import { CommentsModule } from '@tuskdesk-suite/api/comments/src';
import { EventLogModule } from '@tuskdesk-suite/api/event-log/src';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';
import { TicketController } from './ticket.controller';

@Module({
  imports: [ApiTicketsDataAccessModule, EventLogModule, CommentsModule],
  controllers: [TicketController],
  providers: []
})
export class ApiTicketsFeatureModule {}
