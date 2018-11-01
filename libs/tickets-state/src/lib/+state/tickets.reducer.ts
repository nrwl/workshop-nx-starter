import { TicketsState } from './tickets.interfaces';
import { TicketActionTypes, LoadTicketDone, TicketsAction, LoadTicketsDone } from './tickets.actions';

export const FEATURE_TICKETS = 'tickets';

export const initialState: TicketsState = {
  entities: {},
  ids: [],
  selectedId: -1,
  loading: false,
  error: ''
};

export function ticketsReducer(state: TicketsState, action: TicketsAction): TicketsState {
  switch (action.type) {
    case TicketActionTypes.LOAD_ALL_TICKETS_DONE: {
      const tickets = action.tickets;
      const registry = tickets.reduce(
        (entities, contact) => {
          return { ...entities, [contact.id]: contact };
        },
        { ...state.entities }
      );

      return {
        ...state,
        entities: registry,
        ids: tickets.map(ticket => ticket.id)
      };
    }

    case TicketActionTypes.LOAD_TICKET_DONE: {
      const ticket = action.ticket;
      const found = state.entities[ticket.id];

      return !found
        ? {
            ...state,
            entities: {
              ...state.entities,
              [ticket.id]: ticket
            }
          }
        : state;
    }
  }

  return state;
}
