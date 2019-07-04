import { Controller, Get, Req, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { TicketService } from '@tuskdesk-suite/api/tickets/data-access';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';

@Controller('tickets')
export class TicketController {
  constructor(
    private ticketService: TicketService,
    private eventLogService: EventLogService
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
      `viewed TICKET at id ${ticket.id}.`,
      ticket.id
    );
    return ticket;
  }

  @Get(':id/comments')
  getTicketComments(@Req() request: Request) {
    const ticketId = +request.params.id;
    const ticket = this.ticketService.findTicketById(ticketId);
    if (!ticket) {
      throw new BadRequestException(`No Ticket exists at id: ${ticketId}.`);
    }
    const ticketComments = this.ticketService.getComments(ticket);
    if (!ticketComments) {
      throw new BadRequestException(
        `No Comments exists at Ticket id: ${ticketId}.`
      );
    }
    this.eventLogService.trackEvent(
      request,
      'comment',
      `viewed COMMENT for TICKET at id: ${ticketId}`
    );
    return ticketComments;
  }
}
