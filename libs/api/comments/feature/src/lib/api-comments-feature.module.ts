import { Module } from '@nestjs/common';
import { ApiCommentsDataAccessModule } from '@tuskdesk-suite/api/comments/data-access';

@Module({
  imports: [ApiCommentsDataAccessModule]
})
export class ApiCommentsFeatureModule {}
