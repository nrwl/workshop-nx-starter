import { Injectable } from '@nestjs/common';
import { UserService } from '@tuskdesk-suite/api/users';
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

@Injectable()
export class TicketService {
  private tickets = TICKETS;

  constructor(private userService: UserService) {}

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
}
