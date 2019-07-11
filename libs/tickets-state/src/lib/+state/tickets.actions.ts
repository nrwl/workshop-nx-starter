import { createAction, props } from '@ngrx/store';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';

export const loadAllTickets = createAction('[Tickets] Load All Tickets');
export const allTicketsLoadError = createAction(
  '[Tickets] Error Loading All Tickets',
  props<{ error: any }>()
);
export const allTicketsLoaded = createAction(
  '[Tickets] All Tickets Loaded',
  props<{ tickets: Ticket[] }>()
);
export const loadTicket = createAction(
  '[Tickets] Load Ticket by Id',
  props<{ ticketId: number }>()
);
export const ticketLoaded = createAction(
  '[Tickets] Ticket Loaded',
  props<{ ticket: Ticket }>()
);
export const ticketLoadError = createAction(
  '[Tickets] Error Loading Ticket by Id',
  props<{ error: any }>()
);
