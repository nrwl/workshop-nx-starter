import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
  allTicketsLoaded,
  ticketsQuery
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent {
  tickets$: Observable<Ticket[]> = this.store.pipe(
    select(ticketsQuery.getAllTickets)
  );

  constructor(private store: Store<any>, private ticketService: TicketService) {
    this.ticketService
      .getTickets()
      .pipe(tap(tickets => this.store.dispatch(allTicketsLoaded({ tickets }))))
      .subscribe();
  }
}

// Filter function
function isOpen(ticket: Ticket) {
  return ticket.status === 'open';
}
