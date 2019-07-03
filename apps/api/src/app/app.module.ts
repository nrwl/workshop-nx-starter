import { Module } from '@nestjs/common';
import { ApiTicketsFeatureModule } from '@tuskdesk-suite/api/tickets/feature';
import { ApiUsersFeatureModule } from '@tuskdesk-suite/api/users/feature';
import { EventLogModule } from '@tuskdesk-suite/api/event-log';
import { CompaniesModule } from '@tuskdesk-suite/api/companies';
import { CommentsModule } from '@tuskdesk-suite/api/comments';

@Module({
  imports: [
    ApiTicketsFeatureModule,
    ApiUsersFeatureModule,
    EventLogModule,
    CompaniesModule,
    CommentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
