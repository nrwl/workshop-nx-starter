import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Ticket } from '@tuskdesk-suite/data-models';

import { TicketsState } from './tickets.interfaces';
import { FEATURE_TICKETS } from './tickets.reducer';

export namespace ticketsQuery {
  const getTicketsState = createFeatureSelector<TicketsState>(FEATURE_TICKETS);

  export const getIsLoading = createSelector(getTicketsState, (state: TicketsState) => state.loading);
  export const getError = createSelector(getTicketsState, (state: TicketsState) => state.error);
  export const getSelectedId = createSelector(getTicketsState, (state: TicketsState) => state.selectedId);

  export const getAllTickets = createSelector(getTicketsState, (state: TicketsState) => state.list);
  export const getSelectedTicket = createSelector(getAllTickets, getSelectedId, (tickets: Ticket[], id: number) => {
    const ticket = id ? tickets.find((it: Ticket) => it.id === id) : null; // tslint:disable-line
    return ticket ? ({ ...ticket } as Ticket) : null;
  });
}
