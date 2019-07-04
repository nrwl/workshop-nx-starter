import { Controller, Get, Req } from '@nestjs/common';
import { CommentService } from '@tuskdesk-suite/api/comments/data-access/src';
import { Request } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentService) {}

  @Get()
  findAll(@Req() request: Request) {
    const comments = this.commentService.findAll();
    this.commentService.trackEvent(request, 'comment', 'viewed all COMMENTS');
    return comments;
  }
}
