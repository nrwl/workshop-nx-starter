import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { UsersModule, UserService } from '@tuskdesk-suite/api/users';

@Module({
  imports: [UsersModule],
  controllers: [TicketController],
  providers: []
})
export class TicketsModule {}
