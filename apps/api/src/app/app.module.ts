import { Module } from '@nestjs/common';
import { ApiTicketsFeatureModule } from '@tuskdesk-suite/api/tickets/feature';
import { ApiUsersFeatureModule } from '@tuskdesk-suite/api/users/feature';
import { ApiEventLogsFeatureModule } from '@tuskdesk-suite/api/event-logs/feature';
import { ApiCompaniesFeatureModule } from '@tuskdesk-suite/api/companies/feature';
import { CommentsModule } from '@tuskdesk-suite/api/comments';

@Module({
  imports: [
    ApiTicketsFeatureModule,
    ApiUsersFeatureModule,
    ApiEventLogsFeatureModule,
    ApiCompaniesFeatureModule,
    CommentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
