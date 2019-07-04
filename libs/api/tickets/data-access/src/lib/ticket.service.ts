import { Injectable } from '@nestjs/common';
import { UserService } from '@tuskdesk-suite/api/users/data-access';
import {
  byMessage,
  byStatus,
  createTicketRequestFromRequest,
  isAssignedTo,
  isSubmittedBy,
  Ticket,
  TICKETS
} from '@tuskdesk-suite/ticket-utils';
import { Request } from 'express';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';
import { CommentService } from '@tuskdesk-suite/api/comments/data-access';
import { ResourceType } from '@tuskdesk-suite/event-log-utils';

@Injectable()
export class TicketService {
  private tickets = [...TICKETS];

  constructor(
    private userService: UserService,
    private eventLogService: EventLogService,
    private commentService: CommentService
  ) {}

  getCurrentUser(request: Request) {
    return this.userService.findById(+request.header('userid'));
  }

  findMatchingTickets(request: Request): Ticket[] {
    const ticketRequest = createTicketRequestFromRequest(
      request,
      this.userService.findAll()
    );
    const assignedUser = this.userService.findByFullName(
      ticketRequest.assignedToUser
    );
    const ticketsToReturn = this.tickets
      .filter(isSubmittedBy(ticketRequest.currentUser))
      .filter(isAssignedTo(assignedUser))
      .filter(byMessage(ticketRequest.searchTerm))
      .filter(byStatus(ticketRequest.status));
    return ticketsToReturn;
  }

  findTicketById(id: number): Ticket {
    return this.tickets.find(ticket => ticket.id === id);
  }

  trackEvent(
    request: Request,
    context: ResourceType,
    intent = 'viewed',
    itemId?: number
  ) {
    this.eventLogService.trackEvent(request, context, intent, itemId);
  }

  getComments(ticket: Ticket) {
    return this.commentService.findByTicketId(ticket.id);
  }
}
