import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FEATURE_TICKETS } from './tickets.reducer';
import { TicketDictionary, TicketsState } from './tickets.interfaces';

export namespace ticketsQuery {
  const getTicketsState = createFeatureSelector<TicketsState>(FEATURE_TICKETS);

  const getEntities = createSelector(getTicketsState, (state: TicketsState) => state.entities);
  const getIds = createSelector(getTicketsState, (state: TicketsState) => state.ids);

  export const getIsLoading = createSelector(getTicketsState, (state: TicketsState) => state.loading);
  export const getError = createSelector(getTicketsState, (state: TicketsState) => state.error);
  const getSelectedId = createSelector(getTicketsState, (state: TicketsState) => state.selectedId);

  export const getAllTickets = createSelector(getEntities, (registry: TicketDictionary) => {
    return Object.keys(registry).map(id => registry[id]);
  });
  export const getSelectedTicket = createSelector(
    getEntities,
    getSelectedId,
    (entites: TicketDictionary, id: number) => {
      return entites[id];
    }
  );
}
