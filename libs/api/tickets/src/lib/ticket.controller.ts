import { Controller, Get, Req, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { TicketService } from './ticket/ticket.service';
import { EventLogService } from '@tuskdesk-suite/api/event-log';
import { CommentService } from '@tuskdesk-suite/api/comments';

@Controller('tickets')
export class TicketController {
  constructor(
    private ticketService: TicketService,
    private eventLogService: EventLogService,
    private commentService: CommentService
  ) {}

  @Get()
  getMatchingTickets(@Req() request: Request) {
    const matchingTickets = this.ticketService.findMatchingTickets(request);
    this.eventLogService.trackEvent(
      request,
      'ticket',
      `viewed TICKETS at ids [ ${matchingTickets
        .map(ticket => ticket.id)
        .join(', ')} ].`
    );
    // TODO: add delay??
    return matchingTickets;
  }

  @Get(':id')
  getTicket(@Req() request: Request) {
    const ticketId = +request.params.id;
    const ticket = this.ticketService.findTicketById(ticketId);
    if (!ticket) {
      throw new BadRequestException(`No Ticket exists at id: ${ticketId}.`);
    }
    this.eventLogService.trackEvent(
      request,
      'ticket',
      `viewed TICKET at id ${ticket.id}.`
    );
    return ticket;
  }

  @Get(':id')
  getTicketComments(@Req() request: Request) {
    const ticketId = +request.params.id;
    const ticket = this.ticketService.findTicketById(ticketId);
    if (!ticket) {
      throw new BadRequestException(`No Ticket exists at id: ${ticketId}.`);
    }
    const ticketComments = this.commentService;
  }
}
