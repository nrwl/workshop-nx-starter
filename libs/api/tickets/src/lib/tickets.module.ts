import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { UsersModule, UserService } from '@tuskdesk-suite/api/users';
import { TicketService } from './ticket/ticket.service';

@Module({
  imports: [UsersModule],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketsModule {}
