import { Module } from '@nestjs/common';
import { ApiCommentsDataAccessModule } from '@tuskdesk-suite/api/comments/data-access';
import { CommentsController } from './comments.controller';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';

@Module({
  imports: [ApiCommentsDataAccessModule, ApiEventLogsDataAccessModule],
  controllers: [CommentsController]
})
export class ApiCommentsFeatureModule {}
