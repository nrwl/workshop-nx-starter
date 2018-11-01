import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Ticket } from '@tuskdesk-suite/data-models';
import { TicketTimerService } from '../ticket-timer.service';
import { LoadTickets, PartialAppState, ticketsQuery } from '@tuskdesk-suite/tickets-state';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent {
  tickets$: Observable<Ticket[]> = this.store.pipe(
    select(ticketsQuery.getAllTickets),
    map(tickets => {
      return tickets.filter(isOpen);
    })
  );

  markedToWork$: Observable<number[]> = this.timerService.ticketsToWork$;

  constructor(private store: Store<PartialAppState>, private timerService: TicketTimerService) {
    this.store.dispatch(new LoadTickets());
  }
}

// Filter function
function isOpen(ticket: Ticket) {
  return ticket.status === 'open';
}
