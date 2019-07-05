import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentService],
  exports: [CommentService],
  imports: []
})
export class ApiCommentsDataAccessModule {}
