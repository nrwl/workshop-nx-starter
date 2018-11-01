// tickets.effects.ts

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { TicketService } from '@tuskdesk-suite/backend';

import {
  LoadTicket,
  LoadTickets,
  TicketActionTypes,
  LoadTicketsDone,
  LoadTicketDone,
  LoadTicketsError,
  LoadTicketError
} from './tickets.actions';
import { of } from 'rxjs';

@Injectable()
export class TicketsEffects {
  /**
   * Load All Tickets and update state upon server response
   */
  @Effect()
  loadTickets$ = this.actions.pipe(
    ofType<LoadTickets>(TicketActionTypes.LOAD_ALL_TICKETS),
    exhaustMap(() => {
      return this.ticketService.getTickets().pipe(
        map(tickets => new LoadTicketsDone(tickets)),
        catchError(err => {
          return of(new LoadTicketsError(err.toString()));
        })
      );
    })
  );

  /**
   * Load Ticket by Id and update state upon server response
   */
  @Effect()
  loadTicketById$ = this.actions.pipe(
    ofType<LoadTicket>(TicketActionTypes.LOAD_TICKET),
    map(action => action.ticketId),
    mergeMap(ticketId => {
      return this.ticketService.ticketById(ticketId).pipe(
        map(ticket => new LoadTicketDone(ticket)),
        catchError(err => {
          return of(new LoadTicketError(err.toString()));
        })
      );
    })
  );

  constructor(private actions: Actions, private ticketService: TicketService) {}
}
