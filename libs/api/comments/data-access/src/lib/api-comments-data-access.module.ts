import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiUsersDataAccessModule } from '@tuskdesk-suite/api/users/data-access';

@Module({
  providers: [CommentService],
  exports: [CommentService],
  imports: [ApiUsersDataAccessModule]
})
export class ApiCommentsDataAccessModule {}
