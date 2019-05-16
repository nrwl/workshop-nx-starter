import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Ticket } from '@tuskdesk-suite/data-models';
import { TicketTimerService } from '../ticket-timer.service';
import { TicketsFacade } from '@tuskdesk-suite/tickets-state';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent {
  tickets$: Observable<Ticket[]> = this.facade.openItems$;

  markedToWork$: Observable<number[]> = this.timerService.ticketsToWork$;

  constructor(private facade: TicketsFacade, private timerService: TicketTimerService) {}
}
