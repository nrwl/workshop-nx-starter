import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ticket } from '@tuskdesk-suite/data-models';

import { ticketsQuery } from './tickets.selectors';
import { PartialAppState } from './tickets.interfaces';

@Injectable()
export class TicketsFacade {
  allTickets$: Observable<Ticket[]> = this.store.pipe(select(ticketsQuery.getAllTickets));
  selectedTicket$: Observable<Ticket> = this.store.pipe(select(ticketsQuery.getSelectedTicket));

  openItems$: Observable<Ticket[]> = this.allTickets$.pipe(
    map(tickets => {
      const isTicketOpen = (ticket: Ticket) => ticket.status === 'open';
      return tickets.filter(isTicketOpen);
    })
  );

  // Status conditions
  error$: Observable<string> = this.store.pipe(select(ticketsQuery.getError));
  isLoading$: Observable<boolean> = this.store.pipe(select(ticketsQuery.getIsLoading));

  constructor(private readonly store: Store<PartialAppState>) {}
}
