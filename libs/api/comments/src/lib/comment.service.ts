import { Injectable } from '@nestjs/common';
import { Comment, COMMENTS } from '@tuskdesk-suite/comment-utils';

@Injectable()
export class CommentService {
  private comments: Comment[] = [...COMMENTS];
}
