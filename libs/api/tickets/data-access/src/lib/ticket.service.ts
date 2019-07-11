import { Injectable } from '@nestjs/common';
import {
  createTicket,
  CreateTicketPostRequestBody,
  Ticket,
  TICKETS,
  TicketStatus,
  updateTicket
} from '@tuskdesk-suite/shared/ticket-utils';

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
    this.replaceTicket(ticket, updatedTicket);
    return updatedTicket;
  }

  assignUserToTicket(
    ticketId: number,
    assignedToUserId: number,
    assignedToUserFullName: string
  ): Ticket {
    const updatedTicket = {
      ...this.findTicketById(ticketId),
      assignedToUserId,
      assignedToUserFullName
    };
    this.replaceTicket(this.findTicketById(ticketId), updatedTicket);
    return updatedTicket;
  }

  complete(ticketId: number): Ticket {
    const ticket = this.findTicketById(ticketId);
    if (!ticket) {
      throw new Error('Attempted to retrieve a ticket id that does not exist');
    }
    const completedTicket: Ticket = { ...ticket, status: 'completed' };
    this.replaceTicket(ticket, completedTicket);
    return completedTicket;
  }

  private replaceTicket(oldTicket: Ticket, newTicket: Ticket) {
    const indexToReplace = this.tickets.indexOf(oldTicket);
    if (indexToReplace === -1) {
      throw new Error('old ticket not found');
    }
    this.tickets = [
      ...this.tickets.slice(0, indexToReplace),
      newTicket,
      ...this.tickets.slice(indexToReplace + 1)
    ];
  }
}
