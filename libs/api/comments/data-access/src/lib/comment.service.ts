import { Injectable } from '@nestjs/common';
import { Comment, COMMENTS } from '@tuskdesk-suite/comment-utils';

@Injectable()
export class CommentService {
  private comments: Comment[] = [...COMMENTS];

  findById(id: number): Comment {
    return this.comments.find(comment => comment.id === id);
  }

  findByTicketId(ticketId: number): Comment[] {
    return this.comments.filter(comment => comment.ticketId === ticketId);
  }
}
