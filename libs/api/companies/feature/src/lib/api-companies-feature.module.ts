import { Module } from '@nestjs/common';
import { ApiCompaniesDataAccessModule } from '@tuskdesk-suite/api/companies/data-access';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [
    ApiCompaniesDataAccessModule,
    ApiEventLogsDataAccessModule,
    ApiUsersDataAccessModule
  ],
  controllers: [CompaniesController]
})
export class ApiCompaniesFeatureModule {}
