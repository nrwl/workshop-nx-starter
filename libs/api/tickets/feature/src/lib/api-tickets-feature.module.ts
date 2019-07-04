import { Module } from '@nestjs/common';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';
import { TicketController } from './ticket.controller';

@Module({
  imports: [ApiTicketsDataAccessModule],
  controllers: [TicketController],
  providers: []
})
export class ApiTicketsFeatureModule {}
