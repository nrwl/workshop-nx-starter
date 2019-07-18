import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { PartialAppState, TicketsState } from './tickets.interfaces';
import { FEATURE_TICKETS } from './tickets.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export namespace ticketsQuery {
  const selectTicketState = createFeatureSelector<TicketsState>(
    FEATURE_TICKETS
  );
  export const getIsLoading = createSelector(
    selectTicketState,
    state => state.loading
  );
  export const getError = createSelector(
    selectTicketState,
    state => state.error
  );
  export const getSelectedId = createSelector(
    selectTicketState,
    state => state.selectedId
  );
  export const getAllTickets = createSelector(
    selectTicketState,
    state => state.list
  );

  export const getSelectedTicket = createSelector(
    getAllTickets,
    getSelectedId,
    (tickets, id) => {
      const ticket = id ? tickets.find(x => x.id === id) : null;
      return ticket ? ({ ...ticket } as Ticket) : null;
    }
  );
}
