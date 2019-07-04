import { Module } from '@nestjs/common';
import { ApiCompaniesDataAccessModule } from '@tuskdesk-suite/api/companies/data-access';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [ApiCompaniesDataAccessModule],
  controllers: [CompaniesController]
})
export class ApiCompaniesFeatureModule {}
