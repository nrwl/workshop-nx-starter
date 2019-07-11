import { Ticket } from './ticket.interface';
import { User } from '@tuskdesk-suite/user-utils';

export function isSubmittedBy(currentUser: User): (ticket: Ticket) => boolean {
  return ticket =>
    !currentUser || currentUser.isAgent
      ? true
      : ticket.submittedByUserId === currentUser.id;
}
