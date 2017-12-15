import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TicketsStateModelState } from '@tuskdesk-suite/tickets-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Ticket } from '@tuskdesk-suite/data-models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit {
  tickets$: Observable<Ticket[]>;

  constructor(private store: Store<TicketsStateModelState>) {}

  ngOnInit() {
    this.tickets$ = this.store
      .select(s => s.ticketsStateModel.tickets)
      .pipe(map(tickets => tickets.filter(ticket => ticket.status === 'open')));
  }
}
