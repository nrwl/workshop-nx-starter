import { User } from '@tuskdesk-suite/shared/user-utils';
import { Ticket } from './ticket.interface';

export function isAssignedTo(user: User): (ticket: Ticket) => boolean {
  return ticket => (!user ? true : ticket.assignedToUserId === user.id);
}
