import { Injectable } from '@nestjs/common';
import { Comment, COMMENTS } from '@tuskdesk-suite/comment-utils';
import { Request } from 'express';
import { ResourceType } from '@tuskdesk-suite/event-log-utils';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';

@Injectable()
export class CommentService {
  private comments: Comment[] = [...COMMENTS];

  constructor(private eventLogService: EventLogService) {}

  findById(id: number): Comment {
    return this.comments.find(comment => comment.id === id);
  }

  findByTicketId(ticketId: number): Comment[] {
    return this.comments.filter(comment => comment.ticketId === ticketId);
  }

  findAll(): Comment[] {
    return this.comments;
  }

  trackEvent(
    request: Request,
    context: ResourceType,
    intent = 'viewed',
    itemId?: number
  ) {
    this.eventLogService.trackEvent(request, context, intent, itemId);
  }
}
