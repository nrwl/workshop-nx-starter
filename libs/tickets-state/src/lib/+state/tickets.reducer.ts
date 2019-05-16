import { createEntityAdapter } from '@ngrx/entity';

import { Ticket } from '@tuskdesk-suite/data-models';

import { TicketsState } from './tickets.interfaces';
import { TicketActionTypes, TicketsAction } from './tickets.actions';

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
    case TicketActionTypes.SELECT_TICKET: {
      const { selectedId } = action;
      return {
        ...state,
        selectedId
      };
    }

    case TicketActionTypes.LOAD_ALL_TICKETS:
    case TicketActionTypes.LOAD_TICKET: {
      return {
        ...state,
        loading: true
      };
    }

    case TicketActionTypes.LOAD_ALL_TICKETS_DONE: {
      return {
        ...state,
        ...ticketsAdapter.addAll(action.tickets, state),
        loading: false
      };
    }

    case TicketActionTypes.LOAD_TICKET_DONE: {
      return {
        ...state,
        ...ticketsAdapter.upsertOne(action.ticket, state),
        loading: false
      };
    }

    case TicketActionTypes.SELECT_TICKET: {
      const { selectedId } = action;
      return {
        ...state,
        selectedId
      };
    }
  }

  return state;
}
