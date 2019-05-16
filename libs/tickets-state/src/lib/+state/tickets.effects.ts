import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { TicketService } from '@tuskdesk-suite/backend';
import { PartialAppState } from './tickets.interfaces';

import {
  LoadTicket,
  LoadTickets,
  TicketActionTypes,
  LoadTicketsDone,
  LoadTicketDone,
  LoadTicketsError,
  RouterLoadTicket
} from './tickets.actions';

@Injectable()
export class TicketsEffects {
  /**
   * Action switcher...
   */
  @Effect()
  routeToTicket$ = this.actions$.pipe(
    ofType<RouterLoadTicket>(TicketActionTypes.ROUTER_LOAD_TICKET),
    map(event => new LoadTicket(event.ticketId))
  );

  /**
   * Load All Tickets and update state upon server response
   */
  @Effect()
  loadTickets$ = this.d.fetch<LoadTickets>(TicketActionTypes.LOAD_ALL_TICKETS, {
    run: (a: LoadTickets, state: PartialAppState) => {
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
    private actions$: Actions,
    private d: DataPersistence<PartialAppState>,
    private ticketService: TicketService
  ) {}
}
