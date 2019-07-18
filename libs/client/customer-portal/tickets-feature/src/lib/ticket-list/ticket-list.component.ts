import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
  allTicketsLoaded,
  ticketsQuery,
  loadAllTickets
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';

@Component({
  selector: 'tuskdesk-suite-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent {
  tickets$: Observable<Ticket[]> = this.store.pipe(
    select(ticketsQuery.getAllTickets)
  );

  constructor(private store: Store<any>) {
    this.store.dispatch(loadAllTickets());
  }
}

// Filter function
function isOpen(ticket: Ticket) {
  return ticket.status === 'open';
}
