import { TicketsStateModel } from './tickets-state-model.interfaces';
import { TicketsStateModelAction } from './tickets-state-model.actions';

export function ticketsStateModelReducer(state: TicketsStateModel, action: TicketsStateModelAction): TicketsStateModel {
  switch (action.type) {
    case 'TICKETS_LOADED': {
      return { ...state, tickets: action.payload };
    }
    case 'TICKET_LOADED': {
      const tickets = [...state.tickets];
      if (!tickets.some(ticket => ticket.id === action.payload.id)) {
        tickets.push(action.payload);
      }
      return {
        ...state,
        tickets
      };
    }
    default: {
      return state;
    }
  }
}
