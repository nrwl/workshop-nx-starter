import { Module } from '@nestjs/common';
import { ApiCompaniesDataAccessModule } from '@tuskdesk-suite/api/companies/data-access';

@Module({
  imports: [ApiCompaniesDataAccessModule]
})
export class ApiCompaniesFeatureModule {}
