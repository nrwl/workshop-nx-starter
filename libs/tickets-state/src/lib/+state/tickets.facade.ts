import { Injectable } from '@angular/core';

import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ticket } from '@tuskdesk-suite/data-models';

import { ticketsQuery } from './tickets.selectors';
import { PartialAppState } from './tickets.interfaces';
import { LoadTicket } from './tickets.actions';

@Injectable()
export class TicketsFacade {
  // Ticket Lists
  allItems$: Observable<Ticket[]> = this.store.pipe(select(ticketsQuery.getAllTickets));
  entities$: Observable<Dictionary<Ticket>> = this.store.pipe(select(ticketsQuery.getTicketAsEntities));

  openItems$: Observable<Ticket[]> = this.allItems$.pipe(
    map(tickets => {
      const isTicketOpen = (ticket: Ticket) => ticket.status === 'open';
      return tickets.filter(isTicketOpen);
    })
  );

  // Status conditions
  isLoading$: Observable<boolean> = this.store.pipe(select(ticketsQuery.getIsLoading));
  error$: Observable<string | undefined> = this.store.pipe(select(ticketsQuery.getError));

  constructor(private readonly store: Store<PartialAppState>) {}

  loadTicketById(ticketId: number) {
    this.store.dispatch(new LoadTicket(ticketId));
  }
}
