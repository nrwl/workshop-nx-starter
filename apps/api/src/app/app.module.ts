import { Module } from '@nestjs/common';
import { TicketsModule } from '@tuskdesk-suite/api/tickets';
import { UsersModule } from '@tuskdesk-suite/api/users';
import { EventLogModule } from '@tuskdesk-suite/api/event-log';
import { CompaniesModule } from '@tuskdesk-suite/api/companies';
import { CommentsModule } from '@tuskdesk-suite/api/comments';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TicketsModule,
    UsersModule,
    EventLogModule,
    CompaniesModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
