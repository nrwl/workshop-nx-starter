import { TicketsState } from './tickets.interfaces';
import { TicketActionTypes, LoadTicketDone, TicketsAction, LoadTicketsDone } from './tickets.actions';

export const FEATURE_TICKETS = 'tickets';

export const initialState: TicketsState = {
  list: [],
  selectedId: -1,
  loading: false,
  error: ''
};

export function ticketsReducer(state: TicketsState, action: TicketsAction): TicketsState {
  switch (action.type) {
    case TicketActionTypes.LOAD_TICKET_DONE: {
      const list = [...state.list];
      const ticket = (action as LoadTicketDone).ticket;
      if (!list.some(it => it.id === ticket.id)) {
        list.push(ticket);
      }

      return {
        ...state,
        list
      };
    }
  }

  return state;
}
