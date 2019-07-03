import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TicketService],
  exports: [TicketService]
})
export class ApiTicketsDataAccessModule {}
