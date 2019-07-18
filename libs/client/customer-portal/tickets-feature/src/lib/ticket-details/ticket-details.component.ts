import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  loadTicket,
  ticketsQuery
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import { Comment } from '@tuskdesk-suite/shared/comment-utils';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { combineLatest, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import { TicketTimerService } from '../ticket-timer.service';

@Component({
  selector: 'tuskdesk-suite-ticket-details',
  templateUrl: './ticket-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket>;
  comments$: Observable<Comment[]>;
  ticketMessage = new FormControl();
  timer$: Observable<number>;
  private id$ = this.route.params.pipe(map(params => +params['id']));
  onDestroy$ = new Subject<void>();

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private ticketTimerService: TicketTimerService
  ) {}

  ngOnInit() {
    // get a ticket to render to the UI
    this.ticket$ = combineLatest([
      this.store.pipe(select(ticketsQuery.getAllTickets)),
      this.id$
    ]).pipe(map(([tickets, id]) => tickets.find(ticket => ticket.id === id)));

    // request a ticket
    this.id$
      .pipe(
        take(1),
        tap(ticketId => this.store.dispatch(loadTicket({ ticketId })))
      )
      .subscribe();
  }

  switchToEdit() {}

  cancelEdit() {}

  saveEdit() {}

  startTimer() {
    this.timer$ = this.ticketTimerService.timer$;
  }

  markToWork(ticketId: number) {}
}
