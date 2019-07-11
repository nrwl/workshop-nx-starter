import { Module } from '@nestjs/common';
import { ApiCommentsDataAccessModule } from '@tuskdesk-suite/api/comments/data-access';
import { ApiCompaniesDataAccessModule } from '@tuskdesk-suite/api/companies/data-access';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';
import { TicketController } from './ticket.controller';
import { AssignController } from './assign.controller';
import { CompleteController } from './complete.controller';

@Module({
  imports: [
    ApiTicketsDataAccessModule,
    ApiEventLogsDataAccessModule,
    ApiUsersDataAccessModule,
    ApiCommentsDataAccessModule,
    ApiCompaniesDataAccessModule
  ],
  controllers: [TicketController, AssignController, CompleteController],
  providers: []
})
export class ApiTicketsFeatureModule {}
