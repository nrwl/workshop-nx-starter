import { Injectable } from '@nestjs/common';
import {
  Comment,
  COMMENTS,
  CreateCommentData
} from '@tuskdesk-suite/shared/comment-utils';

@Injectable()
export class CommentService {
  private comments: Comment[] = [...COMMENTS];
  private lastId = this.comments.length;

  findById(id: number): Comment {
    return this.comments.find(comment => comment.id === id);
  }

  findByTicketId(ticketId: number): Comment[] {
    return this.comments.filter(comment => comment.ticketId === ticketId);
  }

  findAll(): Comment[] {
    return this.comments;
  }

  add(createComponentObj: CreateCommentData): Comment {
    const comment = { ...createComponentObj, id: ++this.lastId };
    this.comments = [...this.comments, comment];
    return comment;
  }
}
