import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { UsersModule } from '@tuskdesk-suite/api/users';
import { EventLogModule } from '@tuskdesk-suite/api/event-log';
import { TicketService } from './ticket/ticket.service';
import { CommentsModule } from '@tuskdesk-suite/api/comments';

@Module({
  imports: [UsersModule, EventLogModule, CommentsModule],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketsModule {}
