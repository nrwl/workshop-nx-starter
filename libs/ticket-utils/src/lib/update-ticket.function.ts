import { Ticket } from './ticket.interface';
import { TicketStatus } from './ticket-status.type';

export function updateTicket(
  ticket: Ticket,
  status?: TicketStatus,
  message?: string,
  assignedUserId?: number,
  assignedUserName?: string
): Ticket {
  return {
    ...ticket,
    status: status || ticket.status,
    message: message || ticket.message,
    assignedToUserId: assignedUserId || ticket.assignedToUserId,
    assignedToUserFullName: assignedUserName || ticket.assignedToUserFullName
  };
}
