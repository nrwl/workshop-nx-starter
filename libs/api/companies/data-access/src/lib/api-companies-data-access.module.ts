import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';

@Module({
  imports: [ApiEventLogsDataAccessModule],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class ApiCompaniesDataAccessModule {}
