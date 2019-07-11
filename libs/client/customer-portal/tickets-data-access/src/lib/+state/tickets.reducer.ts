import { TicketsState } from './tickets.interfaces';
import { allTicketsLoaded, ticketLoaded } from './tickets.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const FEATURE_TICKETS = 'tickets';

export const initialState: TicketsState = {
  list: [],
  selectedId: -1,
  loading: false,
  error: ''
};

const reducer = createReducer(
  initialState,
  on(allTicketsLoaded, (state, { tickets }) => ({ ...state, list: tickets })),
  // NOTE: ticketLoaded doesn't yet work for updating a ticket.... only adding one
  on(ticketLoaded, (state, { ticket }) =>
    state.list.find(x => x.id === ticket.id)
      ? state
      : { ...state, list: [...state.list, ticket] }
  )
);

export function ticketsReducer(
  state: TicketsState | undefined,
  action: Action
): TicketsState {
  return reducer(state, action);
}
