import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req
} from '@nestjs/common';
import { CommentService } from '@tuskdesk-suite/api/comments/data-access';
import { CompanyService } from '@tuskdesk-suite/api/companies/data-access';
import { EventLogService } from '@tuskdesk-suite/api/event-logs/data-access';
import { TicketService } from '@tuskdesk-suite/api/tickets/data-access';
import { UserService } from '@tuskdesk-suite/api/users/data-access';
import {
  byMessage,
  byStatus,
  CreateTicketPostRequestBody,
  isAssignedTo,
  isCreateTicketPostRequestBody,
  isSubmittedBy,
  isUpdateTicketPostRequestBody,
  Ticket,
  UpdateTicketPostRequestBody
} from '@tuskdesk-suite/shared/ticket-utils';
import { Request } from 'express';
import { createTicketRequestFromRequest } from './create-ticket-request.function';

@Controller('tickets')
export class TicketController {
  constructor(
    private ticketService: TicketService,
    private eventLogService: EventLogService,
    private userService: UserService,
    private commentService: CommentService,
    private companyService: CompanyService
  ) {}

  @Get()
  getMatchingTickets(@Req() request: Request) {
    const matchingTickets = this.findMatchingTickets(request);
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
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
      this.userService.findById(+request.headers.userid),
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
    const ticketComments = this.commentService.findByTicketId(ticket.id);
    if (!ticketComments) {
      throw new BadRequestException(
        `No Comments exists at Ticket id: ${ticketId}.`
      );
    }
    this.eventLogService.trackEvent(
      this.userService.findById(+request.headers.userid),
      'comment',
      `viewed COMMENT for TICKET at id: ${ticketId}`
    );
    return ticketComments;
  }

  @Post()
  postTicket(@Req() request: Request) {
    const body = request.body;
    if (this.validateBodyForCreate(body)) {
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
      const newTicket = this.ticketService.createTicket(
        body,
        company.id,
        submittingUser.id,
        assignedUser && assignedUser.id,
        assignedUser && assignedUser.fullName
      );
      this.eventLogService.trackEvent(
        this.userService.findById(+request.headers.userid),
        'ticket',
        `CREATE TICKET at id: ${newTicket.id}`,
        newTicket.id
      );
      return newTicket;
    }
    if (this.validateBodyForUpdate(body)) {
      const ticket = this.ticketService.findTicketById(body.id);
      if (!ticket) {
        throw new BadRequestException(`No Ticket found at id: ${body.id}`);
      }
      const assignedUser = this.userService.findById(body.assignedToUserId);
      if (!assignedUser && body.assignedToUserId) {
        throw new BadRequestException(
          `No User found at id: ${body.assignedToUserId}`
        );
      }
      const updatedTicket = this.ticketService.updateTicket(
        body.id,
        body.status,
        body.message,
        assignedUser && assignedUser.id,
        assignedUser && assignedUser.fullName
      );
      this.eventLogService.trackEvent(
        this.userService.findById(+request.headers.userid),
        'ticket',
        `UPDATE TICKET at id: ${updatedTicket.id}`,
        updatedTicket.id
      );
      return updatedTicket;
    }
    throw new BadRequestException(
      'Invalid body; could not validate a create or update request'
    );
  }

  private findMatchingTickets(request: Request): Ticket[] {
    const ticketRequest = createTicketRequestFromRequest(
      request,
      this.userService.findAll()
    );
    const assignedUser = this.userService.findByFullName(
      ticketRequest.assignedToUser
    );
    const ticketsToReturn = this.ticketService
      .findAll()
      .filter(isSubmittedBy(ticketRequest.currentUser))
      .filter(isAssignedTo(assignedUser))
      .filter(byMessage(ticketRequest.searchTerm))
      .filter(byStatus(ticketRequest.status));
    return ticketsToReturn;
  }

  private validateBodyForCreate(
    body: any
  ): body is CreateTicketPostRequestBody {
    return isCreateTicketPostRequestBody(body);
  }

  private validateBodyForUpdate(
    body: any
  ): body is UpdateTicketPostRequestBody {
    return isUpdateTicketPostRequestBody(body);
  }
}
