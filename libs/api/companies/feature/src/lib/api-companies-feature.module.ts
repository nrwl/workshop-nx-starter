import { Module } from '@nestjs/common';
import { ApiCompaniesDataAccessModule } from '@tuskdesk-suite/api/companies/data-access';
import { CompaniesController } from './companies.controller';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';

@Module({
  imports: [ApiCompaniesDataAccessModule, ApiEventLogsDataAccessModule],
  controllers: [CompaniesController]
})
export class ApiCompaniesFeatureModule {}
