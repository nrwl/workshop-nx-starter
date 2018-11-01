import { createEntityAdapter } from '@ngrx/entity';

import { Ticket } from '@tuskdesk-suite/data-models';

import { TicketsState } from './tickets.interfaces';
import { TicketActionTypes, LoadTicketDone, TicketsAction, LoadTicketsDone } from './tickets.actions';

export const FEATURE_TICKETS = 'tickets';

export const ticketsAdapter = createEntityAdapter<Ticket>();

export const getInitialState = () =>
  ticketsAdapter.getInitialState({
    selectedId: -1,
    loading: false,
    error: ''
  });

export function ticketsReducer(state: TicketsState, action: TicketsAction): TicketsState {
  switch (action.type) {
    case TicketActionTypes.LOAD_ALL_TICKETS_DONE: {
      const tickets = action.tickets;
      return {
        ...state,
        ...ticketsAdapter.addAll(tickets, state)
      };
    }

    case TicketActionTypes.LOAD_TICKET_DONE: {
      const ticket = action.ticket;
      return {
        ...state,
        ...ticketsAdapter.upsertOne(ticket, state)
      };
    }
  }

  return state;
}
