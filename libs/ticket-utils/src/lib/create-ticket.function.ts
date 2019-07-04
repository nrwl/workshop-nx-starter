import { CreateTicketPostRequestBody } from './create-ticket-post-request-body.interface';
import { Ticket } from './ticket.interface';

export function createTicket(
  request: CreateTicketPostRequestBody,
  companyId: number,
  submittingUserId: number,
  id: number,
  assignedUserId?: number,
  assignedUserName?: string
): Ticket {
  return {
    id,
    message: request.message,
    status: 'open',
    companyId,
    submittedByUserId: submittingUserId,
    assignedToUserId: assignedUserId,
    assignedToUserFullName: assignedUserName
  };
}
