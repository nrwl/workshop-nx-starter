import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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
