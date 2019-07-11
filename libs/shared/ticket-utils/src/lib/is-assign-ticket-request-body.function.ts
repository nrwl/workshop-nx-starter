import { AssignTicketRequestBody } from './assign-ticket-request-body.interface';

export function isAssignTicketRequestBody(
  arg: any
): arg is AssignTicketRequestBody {
  if (Object.entries(arg).length !== 2) {
    return false;
  }
  if (!arg.ticketId || typeof arg.ticketId !== 'number') {
    return false;
  }
  if (!arg.assignToUserId || typeof arg.ticketId !== 'number') {
    return false;
  }
  return true;
}
