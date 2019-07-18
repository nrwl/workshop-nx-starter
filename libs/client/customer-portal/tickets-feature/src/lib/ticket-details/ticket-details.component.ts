import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Comment } from '@tuskdesk-suite/shared/comment-utils';
import { FormControl } from '@angular/forms';
import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { TicketTimerService } from '../ticket-timer.service';
import { Store, select } from '@ngrx/store';
import {
  ticketsQuery,
  ClientCustomerPortalTicketsDataAccessModule,
  ticketLoaded
} from '@tuskdesk-suite/client/customer-portal/tickets-data-access';
import {
  map,
  publishReplay,
  refCount,
  switchMap,
  tap,
  takeUntil,
  take
} from 'rxjs/operators';
import { combineLatest, Subscription, Subject } from 'rxjs';

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
    private service: TicketService,
    private route: ActivatedRoute,
    private ticketTimerService: TicketTimerService
  ) {}

  ngOnInit() {
    // get a ticket to render to the UI
    this.ticket$ = combineLatest([
      this.store.pipe(select(ticketsQuery.getAllTickets)),
      this.id$
    ]).pipe(map(([tickets, id]) => tickets.find(ticket => ticket.id === id)));

    // retrieve the ticket from the api and stash it in the store
    this.id$
      .pipe(
        take(1),
        switchMap(id => this.service.ticketById(id)),
        tap(ticket => this.store.dispatch(ticketLoaded({ ticket })))
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
