import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { DataPersistence } from '@nrwl/nx';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { TicketService } from '@tuskdesk-suite/backend';
import { PartialAppState } from './tickets.interfaces';

import {
  LoadTicket,
  LoadTickets,
  TicketActionTypes,
  LoadTicketsDone,
  LoadTicketDone,
  LoadTicketsError,
  SelectTicket,
  RouterLoadTicket
} from './tickets.actions';
import { ticketsQuery } from './tickets.selectors';

@Injectable()
export class TicketsEffects {
  /**
   * Read-only accessor to ticket dictionary for fast lookups
   */
  readonly ticketRegistry$ = this.store.pipe(select(ticketsQuery.getTicketAsEntities));

  /**
   * Action Decider
   */
  @Effect()
  routeAndLoad$ = this.actions$.pipe(
    ofType<RouterLoadTicket>(TicketActionTypes.ROUTER_LOAD_TICKET),
    map(action => action.ticketId),
    withLatestFrom(this.ticketRegistry$),
    switchMap(([ticketId, entities]) => {
      const selectTicket = new SelectTicket(ticketId);
      const loadTicket = new LoadTicket(ticketId);
      const hasTicket = !!entities[ticketId];

      return hasTicket ? [selectTicket] : [loadTicket, selectTicket];
    })
  );

  /**
   * Load All Tickets and update state upon server response
   */
  @Effect()
  loadAllTickets$ = this.d.fetch<LoadTickets>(TicketActionTypes.LOAD_ALL_TICKETS, {
    run: (a: LoadTickets, _: PartialAppState) => {
      return this.ticketService.getTickets().pipe(
        map(tickets => {
          return new LoadTicketsDone(tickets);
        })
      );
    },
    onError: (a: LoadTickets, error) => {
      return new LoadTicketsError(error.toString());
    }
  });

  /**
   * Load Ticket by Id and update state upon server response
   */
  @Effect()
  loadTicket$ = this.d.fetch<LoadTicket>(TicketActionTypes.LOAD_TICKET, {
    run: (a: LoadTicket, state: PartialAppState) => {
      return this.ticketService.ticketById(a.ticketId).pipe(
        map(ticket => {
          return new LoadTicketDone(ticket);
        })
      );
    },
    onError: (a: LoadTicket, error) => {}
  });

  constructor(
    private store: Store<PartialAppState>,
    private actions$: Actions,
    private d: DataPersistence<PartialAppState>,
    private ticketService: TicketService
  ) {}
}
