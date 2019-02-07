import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Ticket } from '@tuskdesk-suite/data-models';
import { TicketService } from '@tuskdesk-suite/backend';
import { TicketTimerService } from '../ticket-timer.service';

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

  markedToWork$: Observable<number[]> = this.timerService.ticketsToWork$;

  constructor(private ticketService: TicketService, private timerService: TicketTimerService) {}
}

// Filter function
function isOpen(ticket: Ticket) {
  return ticket.status === 'open';
}
