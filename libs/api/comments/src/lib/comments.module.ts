import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentsModule {}
