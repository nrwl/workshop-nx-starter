import { Ticket } from './ticket.interface';

export function byStatus(status: string): (ticket: Ticket) => boolean {
  return ticket => (!!status ? ticket.status === status : true);
}
