import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  loadAllTickets,
  allTicketsLoaded,
  loadTicket,
  ticketLoaded
} from './tickets.actions';
import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class TicketEffects {
  loadAllTickets$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadAllTickets),
      switchMap(() => this.ticketService.getTickets()),
      map(tickets => allTicketsLoaded({ tickets }))
    )
  );

  ticketLoaded$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadTicket),
      map(action => action.ticketId),
      switchMap(ticketId => this.ticketService.ticketById(ticketId)),
      map(ticket => ticketLoaded({ ticket }))
    )
  );

  constructor(
    private store: Store<any>,
    private actions: Actions,
    private ticketService: TicketService
  ) {}
}
