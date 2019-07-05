import { Injectable } from '@nestjs/common';
import {
  createTicket,
  CreateTicketPostRequestBody,
  Ticket,
  TICKETS,
  TicketStatus,
  updateTicket
} from '@tuskdesk-suite/ticket-utils';

@Injectable()
export class TicketService {
  private tickets = [...TICKETS];
  private currentIndex = this.tickets.length;

  findAll() {
    return this.tickets;
  }

  findTicketById(id: number): Ticket {
    return this.tickets.find(ticket => ticket.id === id);
  }

  createTicket(
    body: CreateTicketPostRequestBody,
    companyId: number,
    submittingUserId: number,
    assignedUserId?: number,
    assignedUserFullName?: string
  ) {
    const newTicket = createTicket(
      body,
      companyId,
      submittingUserId,
      ++this.currentIndex,
      assignedUserId,
      assignedUserFullName
    );
    this.tickets = [...this.tickets, newTicket];
    return newTicket;
  }

  updateTicket(
    ticketId: number,
    status?: TicketStatus,
    message?: string,
    assignedUserId?: number,
    assignedUserFullName?: string
  ) {
    const ticket = this.findTicketById(ticketId);
    const updatedTicket = updateTicket(
      ticket,
      status,
      message,
      assignedUserId,
      assignedUserFullName
    );
    const indexToReplace = this.tickets.indexOf(ticket);
    this.tickets = [
      ...this.tickets.slice(0, indexToReplace),
      updatedTicket,
      ...this.tickets.slice(indexToReplace + 1)
    ];
    return updatedTicket;
  }
}
