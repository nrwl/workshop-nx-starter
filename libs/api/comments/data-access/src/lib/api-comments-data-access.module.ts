import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiEventLogsDataAccessModule } from '@tuskdesk-suite/api/event-logs/data-access';

@Module({
  providers: [CommentService],
  exports: [CommentService],
  imports: [ApiEventLogsDataAccessModule]
})
export class ApiCommentsDataAccessModule {}
