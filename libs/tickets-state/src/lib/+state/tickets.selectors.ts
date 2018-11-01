import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Ticket } from '@tuskdesk-suite/data-models';

import { FEATURE_TICKETS, ticketsAdapter } from './tickets.reducer';
import { TicketsState } from './tickets.interfaces';

const { selectAll, selectEntities } = ticketsAdapter.getSelectors();

export namespace ticketsQuery {
  const getTicketsState = createFeatureSelector<TicketsState>(FEATURE_TICKETS);

  export const getSelectedId = createSelector(getTicketsState, (state: TicketsState) => state.selectedId);
  export const getIsLoading = createSelector(getTicketsState, (state: TicketsState) => state.loading);
  export const getError = createSelector(getTicketsState, (state: TicketsState) => state.error);

  export const getTicketAsEntities = createSelector(getTicketsState, selectEntities);
  export const getAllTickets = createSelector(getTicketsState, selectAll);
  export const getSelectedTicket = createSelector(
    getTicketAsEntities,
    getSelectedId,
    (entities: Dictionary<Ticket>, id: number) => {
      return entities ? entities[id] : null;
    }
  );
}
