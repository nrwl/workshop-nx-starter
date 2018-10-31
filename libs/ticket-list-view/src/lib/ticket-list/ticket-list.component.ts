import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Ticket } from '@tuskdesk-suite/data-models';
import { TicketService } from '@tuskdesk-suite/backend';
import { TicketTimerService } from '../ticket-timer.service';
import { LoadTicketsDone, PartialAppState, ticketsQuery } from '@tuskdesk-suite/tickets-state';

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

  constructor(
    private store: Store<PartialAppState>,
    private service: TicketService,
    private timerService: TicketTimerService
  ) {
    this.service.getTickets().subscribe(tickets => {
      this.store.dispatch(new LoadTicketsDone(tickets));
    });
  }
}

// Filter function
function isOpen(ticket: Ticket) {
  return ticket.status === 'open';
}
