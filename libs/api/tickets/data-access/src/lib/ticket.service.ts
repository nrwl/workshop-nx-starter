import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '@tuskdesk-suite/api/users/data-access';
import {
  byMessage,
  byStatus,
  createTicketRequestFromRequest,
  isAssignedTo,
  isSubmittedBy,
  Ticket,
  TICKETS,
  CreateTicketPostRequestBody,
  isCreateTicketPostRequestBody,
  createTicket,
  UpdateTicketPostRequestBody,
  isUpdateTicketPostRequestBody,
  updateTicket
} from '@tuskdesk-suite/ticket-utils';
import { Request } from 'express';
import { CommentService } from '@tuskdesk-suite/api/comments/data-access';
import { CompanyService } from '@tuskdesk-suite/api/companies/data-access';

@Injectable()
export class TicketService {
  private tickets = [...TICKETS];
  private currentIndex = this.tickets.length;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private companyService: CompanyService
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

  getComments(ticket: Ticket) {
    return this.commentService.findByTicketId(ticket.id);
  }

  validateBodyForCreate(body: any): body is CreateTicketPostRequestBody {
    return isCreateTicketPostRequestBody(body);
  }

  createTicket(body: CreateTicketPostRequestBody) {
    const company = this.companyService.findById(body.companyId);
    if (!company) {
      throw new BadRequestException(
        `No Company found at id: ${body.companyId}`
      );
    }
    const submittingUser = this.userService.findById(body.submittedByUserId);
    if (!submittingUser) {
      throw new BadRequestException(
        `No User found at id: ${body.submittedByUserId}.`
      );
    }
    const assignedUser = body.assignedToUserId
      ? this.userService.findById(body.assignedToUserId)
      : null;
    if (!assignedUser && body.assignedToUserId) {
      throw new BadRequestException(
        `No User found at id: ${body.assignedToUserId}`
      );
    }
    const newTicket = createTicket(
      body,
      company.id,
      submittingUser.id,
      ++this.currentIndex,
      assignedUser && assignedUser.id,
      assignedUser && assignedUser.fullName
    );
    this.tickets = [...this.tickets, newTicket];
    return newTicket;
  }

  validateBodyForUpdate(body: any): body is UpdateTicketPostRequestBody {
    return isUpdateTicketPostRequestBody(body);
  }

  updateTicket(request: UpdateTicketPostRequestBody) {
    const ticket = this.findTicketById(request.id);
    if (!ticket) {
      throw new BadRequestException(`No Ticket found at id: ${request.id}`);
    }
    const assignedUser = this.userService.findById(request.assignedToUserId);
    if (!assignedUser && request.assignedToUserId) {
      throw new BadRequestException(
        `No User found at id: ${request.assignedToUserId}`
      );
    }
    const updatedTicket = updateTicket(
      ticket,
      request.status,
      request.message,
      assignedUser && assignedUser.id,
      assignedUser && assignedUser.fullName
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
