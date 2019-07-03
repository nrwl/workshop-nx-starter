import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';

@Module({
  imports: [],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class ApiCompaniesDataAccessModule {}
