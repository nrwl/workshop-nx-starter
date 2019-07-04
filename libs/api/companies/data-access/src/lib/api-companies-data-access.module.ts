import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';

@Module({
  imports: [ApiEventLogsDataAccessModule, ApiUsersDataAccessModule],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class ApiCompaniesDataAccessModule {}
