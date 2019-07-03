import { Module } from '@nestjs/common';
import { ApiTicketsDataAccessModule } from '@tuskdesk-suite/api/tickets/data-access';

@Module({
  imports: [ApiTicketsDataAccessModule],
  controllers: [],
  providers: []
})
export class ApiTicketsFeatureModule {}
