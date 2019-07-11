import {
  Controller,
  Get,
  Post,
  Req,
  BadRequestException
} from '@nestjs/common';
import { CommentService } from '@tuskdesk-suite/api/comments/data-access';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';
import { Request } from 'express';
import { UserService } from '@tuskdesk-suite/api/users/data-access';
import { TicketService } from '@tuskdesk-suite/api/tickets/data-access';
import {
  isCreateCommentRequestBody,
  CreateCommentData
} from '@tuskdesk-suite/shared/comment-utils';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentService: CommentService,
    private eventLogService: EventLogService,
    private userService: UserService,
    private ticketService: TicketService
  ) {}

  @Get()
  findAll(@Req() request: Request) {
    const comments = this.commentService.findAll();
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'comment',
      'viewed all COMMENTS'
    );
    return comments;
  }

  @Post()
  postComment(@Req() request: Request) {
    const createComponentInfo = this.validateCreateRequest(request);
    const comment = this.commentService.add(createComponentInfo);
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'comment',
      `created COMMENT at id: ${comment.id}.`,
      comment.id
    );
    return comment;
  }

  private validateCreateRequest(request: Request): CreateCommentData {
    const userId = +request.headers.userid;
    if (userId == null) {
      throw new BadRequestException(`No 'userid' header on request.`);
    }
    const user = this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException(`No user exists at id: ${userId}`);
    }
    const body = request.body;
    if (!isCreateCommentRequestBody(body)) {
      throw new BadRequestException(`Invalid request body`);
    }
    const ticket = this.ticketService.findTicketById(body.ticketId);
    if (!ticket) {
      throw new BadRequestException(`No ticket exists at id: ${body.ticketId}`);
    }
    return {
      message: request.body.message,
      ticketId: +request.body.ticketId,
      userId: +request.headers.userid,
      userFullName: user.fullName
    };
  }
}
