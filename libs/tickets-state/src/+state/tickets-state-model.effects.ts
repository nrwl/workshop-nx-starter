import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { TicketsStateModelState } from './tickets-state-model.interfaces';
import { LoadTicket, LoadTickets } from './tickets-state-model.actions';
import { TicketService } from '@tuskdesk-suite/backend';
import { map } from 'rxjs/operators';

@Injectable()
export class TicketsStateModelEffects {
  @Effect()
  loadTickets = this.d.fetch('LOAD_TICKETS', {
    run: (a: LoadTickets, state: TicketsStateModelState) => {
      return this.ticketService.getTickets().pipe(
        map(tickets => {
          return {
            type: 'TICKETS_LOADED',
            payload: tickets
          };
        })
      );
    },

    onError: (a: LoadTickets, error) => {
      return { type: 'LOAD_TICKETS_FAILED' };
    }
  });

  @Effect()
  loadTicket = this.d.fetch('LOAD_TICKET', {
    run: (a: LoadTicket, state: TicketsStateModelState) => {
      return this.ticketService.ticketById(a.payload).pipe(
        map(ticket => {
          return {
            type: 'TICKET_LOADED',
            payload: ticket
          };
        })
      );
    },

    onError: (a: LoadTicket, error) => {}
  });

  constructor(
    private actions: Actions,
    private d: DataPersistence<TicketsStateModelState>,
    private ticketService: TicketService
  ) {}
}
