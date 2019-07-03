import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';

@Module({
  imports: [ApiUsersDataAccessModule],
  controllers: [],
  providers: [TicketService],
  exports: [TicketService]
})
export class ApiTicketsDataAccessModule {}
