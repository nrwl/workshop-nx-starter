import { Ticket } from './ticket.interface';

export function byMessage(message: string): (ticket: Ticket) => boolean {
  return ticket =>
    !!message
      ? ticket.message.toLowerCase().indexOf(message.toLowerCase()) >= 0
      : true;
}
