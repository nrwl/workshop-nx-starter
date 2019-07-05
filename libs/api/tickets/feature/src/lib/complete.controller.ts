import { Controller, Post, Req, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '@tuskdesk-suite/api/users/data-access/src';
import { TicketService } from '@tuskdesk-suite/api/tickets/data-access/src';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access/src';

@Controller('complete')
export class CompleteController {
  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private eventLogService: EventLogService
  ) {}

  @Post()
  completeTicket(@Req() request: Request) {
    const userId = +request.headers.userid;
    const user = this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException(`Could not validate requestor's identity.`);
    }
    if (
      Object.entries(request.body).length !== 1 ||
      typeof request.body.ticketId !== 'number'
    ) {
      throw new BadRequestException('Invalid request body.');
    }
    const ticket = this.ticketService.findTicketById(+request.body.ticketId);
    if (!ticket) {
      throw new BadRequestException(
        `No ticket exists at id: ${request.body.ticketId}.`
      );
    }
    const updatedTicket = this.ticketService.complete(ticket.id);
    this.eventLogService.trackEvent(
      user,
      'ticket',
      `marked ticket at id: ${ticket.id} as complete`,
      ticket.id
    );
    return updatedTicket;
  }
}
