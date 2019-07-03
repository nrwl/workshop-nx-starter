import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CompanyService]
})
export class CompaniesModule {}
