import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Ticket } from '@tuskdesk-suite/data-models';
import { TicketService } from '@tuskdesk-suite/backend';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent {
  tickets$: Observable<Ticket[]> = this.ticketService.getTickets().pipe(
    map(tickets => {
      return tickets.filter(isOpen);
    })
  );

  constructor(private ticketService: TicketService) {}
}

// Filter function
function isOpen(ticket: Ticket) {
  return ticket.status === 'open';
}
