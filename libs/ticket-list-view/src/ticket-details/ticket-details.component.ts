import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicketsStateModelState } from '@tuskdesk-suite/tickets-state';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Ticket, TicketComment } from '@tuskdesk-suite/data-models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket>;
  comments$: Observable<TicketComment[]>;
  ticketMessage = new FormControl();
  timer$: Observable<number>;

  constructor(private store: Store<TicketsStateModelState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.store.dispatch({ type: 'LOAD_TICKET', payload: id });
      this.ticket$ = this.store
        .select(s => s.ticketsStateModel.tickets)
        .pipe(map(tickets => tickets.find(ticket => ticket.id === id)));
    });
  }

  switchToEdit() {}

  cancelEdit() {}

  saveEdit() {}

  startTimer() {}

  markToWork(ticketId: string) {}
}
