import { Action } from '@ngrx/store';
import { Ticket } from '@tuskdesk-suite/data-models';

export enum TicketActionTypes {
  LOAD_ALL_TICKETS = '[Tickets] Load All Tickets',
  LOAD_ALL_TICKETS_ERROR = '[Tickets] Error Loading All Tickets',
  LOAD_ALL_TICKETS_DONE = '[Tickets] All Tickets Loaded',

  LOAD_TICKET = '[Tickets] Load Ticket by Id',
  LOAD_TICKET_DONE = '[Tickets] Ticket Loaded',
  LOAD_TICKET_ERROR = '[Tickets] Error Loading Ticket by Id',

  SELECT_TICKET = '[Tickets] Select Ticket by Id',
  ROUTER_LOAD_TICKET = '[Tickets] Load Ticket from Router Navigation'
}

export class LoadTickets implements Action {
  readonly type = TicketActionTypes.LOAD_ALL_TICKETS;
}

export class LoadTicketsError implements Action {
  readonly type = TicketActionTypes.LOAD_ALL_TICKETS_ERROR;
  constructor(readonly error: any) {}
}
export class LoadTicketsDone implements Action {
  readonly type = TicketActionTypes.LOAD_ALL_TICKETS_DONE;
  constructor(readonly tickets: Ticket[]) {}
}

export class LoadTicket implements Action {
  readonly type = TicketActionTypes.LOAD_TICKET;
  constructor(readonly ticketId: number) {}
}

export class LoadTicketDone implements Action {
  readonly type = TicketActionTypes.LOAD_TICKET_DONE;
  constructor(readonly ticket: Ticket) {}
}

export class LoadTicketError implements Action {
  readonly type = TicketActionTypes.LOAD_TICKET_ERROR;
  constructor(readonly error: any) {}
}

export class SelectTicket implements Action {
  readonly type = TicketActionTypes.SELECT_TICKET;
  constructor(readonly selectedId: number) {}
}

export class RouterLoadTicket implements Action {
  readonly type = TicketActionTypes.ROUTER_LOAD_TICKET;
  constructor(readonly ticketId: number) {}
}

export type TicketsAction =
  | LoadTickets
  | LoadTicketsDone
  | LoadTicketsError
  | LoadTicket
  | LoadTicketDone
  | LoadTicketError
  | SelectTicket
  | RouterLoadTicket;
