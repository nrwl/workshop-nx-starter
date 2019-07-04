import { Controller, Get, Req } from '@nestjs/common';
import { CommentService } from '@tuskdesk-suite/api/comments/data-access/src';
import { Request } from 'express';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access/src';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentService: CommentService,
    private eventLogService: EventLogService
  ) {}

  @Get()
  findAll(@Req() request: Request) {
    const comments = this.commentService.findAll();
    this.eventLogService.trackEvent(request, 'comment', 'viewed all COMMENTS');
    return comments;
  }
}
