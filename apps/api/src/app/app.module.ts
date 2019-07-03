import { Module } from '@nestjs/common';
import { ApiTicketsFeatureModule } from '@tuskdesk-suite/api/tickets/feature';
import { ApiUsersFeatureModule } from '@tuskdesk-suite/api/users/feature';
import { ApiEventLogsFeatureModule } from '@tuskdesk-suite/api/event-logs/feature';
import { ApiCompaniesFeatureModule } from '@tuskdesk-suite/api/companies/feature';
import { ApiCommentsFeatureModule } from '@tuskdesk-suite/api/comments/feature';

@Module({
  imports: [
    ApiTicketsFeatureModule,
    ApiUsersFeatureModule,
    ApiEventLogsFeatureModule,
    ApiCompaniesFeatureModule,
    ApiCommentsFeatureModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
