import { Controller, Post, Req, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { isAssignTicketRequestBody } from '@tuskdesk-suite/shared/ticket-utils';
import { TicketService } from '@tuskdesk-suite/api/tickets/data-access';
import { UserService } from '@tuskdesk-suite/api/users/data-access/src';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access/src';

@Controller('assign')
export class AssignController {
  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private eventLogService: EventLogService
  ) {}

  @Post()
  assign(@Req() request: Request) {
    const requestUserId = +request.headers.userid;
    const requestingUser = this.userService.findById(requestUserId);
    if (!requestingUser) {
      throw new BadRequestException(`Unable to verify requestor's identity.`);
    }
    if (!isAssignTicketRequestBody(request.body)) {
      throw new BadRequestException('Invalid request body');
    }
    const ticket = this.ticketService.findTicketById(request.body.ticketId);
    if (!ticket) {
      throw new BadRequestException(
        `No ticket exists at id: ${request.body.ticketId}.`
      );
    }
    const assignedUser = this.userService.findById(request.body.assignToUserId);
    if (!assignedUser) {
      throw new BadRequestException(
        `No user exists at id: ${request.body.assignToUserId}.`
      );
    }
    const updatedTicket = this.ticketService.assignUserToTicket(
      ticket.id,
      assignedUser.id,
      assignedUser.fullName
    );
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'ticket',
      `assigned TICKET at id: ${request.body.ticketId} to USER at id: ${
        request.body.assignToUserId
      }.`,
      request.body.ticketId
    );
    return updatedTicket;
  }
}
