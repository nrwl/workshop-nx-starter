import { Module } from '@nestjs/common';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';
import { TicketController } from './ticket.controller';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';

@Module({
  imports: [ApiTicketsDataAccessModule, ApiEventLogsDataAccessModule],
  controllers: [TicketController],
  providers: []
})
export class ApiTicketsFeatureModule {}
