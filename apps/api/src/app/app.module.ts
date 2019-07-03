import { Module } from '@nestjs/common';
import { TicketsModule } from '@tuskdesk-suite/api/tickets';
import { UsersModule } from '@tuskdesk-suite/api/users';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TicketsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
