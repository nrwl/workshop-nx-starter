import { Ticket } from '@tuskdesk-suite/data-models';

export interface LoadTickets {
  type: 'LOAD_TICKETS';
}

export interface TicketsLoaded {
  type: 'TICKETS_LOADED';
  payload: Ticket[];
}

export interface LoadTicket {
  type: 'LOAD_TICKET';
  payload: number;
}

export interface TicketLoaded {
  type: 'TICKET_LOADED';
  payload: Ticket;
}

export type TicketsStateModelAction = LoadTickets | TicketsLoaded | LoadTicket | TicketLoaded;
