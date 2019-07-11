import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { PartialAppState } from './tickets.interfaces';
import { FEATURE_TICKETS } from './tickets.reducer';

export namespace ticketsQuery {
  export const getIsLoading = (state: PartialAppState) =>
    state[FEATURE_TICKETS].loading;
  export const getError = (state: PartialAppState) =>
    state[FEATURE_TICKETS].error;
  export const getSelectedId = (state: PartialAppState) =>
    state[FEATURE_TICKETS].selectedId;
  export const getAllTickets = (state: PartialAppState) =>
    state[FEATURE_TICKETS].list;

  export const getSelectedTicket = (state: PartialAppState) => {
    const selectedId = getSelectedId(state);
    const tickets = getAllTickets(state);
    const matchingIds = (it: Ticket) => it.id === selectedId;
    const ticket = selectedId ? tickets.find(matchingIds) : null;

    return ticket ? ({ ...ticket } as Ticket) : null;
  };
}
