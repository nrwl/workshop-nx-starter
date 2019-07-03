import { Module } from '@nestjs/common';
import { TicketsModule } from '@tuskdesk-suite/api/tickets';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TicketsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
