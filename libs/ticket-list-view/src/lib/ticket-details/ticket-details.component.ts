import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators';
import { untilViewDestroyed } from '@tuskdesk-suite/utils';
import { select, Store } from '@ngrx/store';

import { Ticket, TicketComment } from '@tuskdesk-suite/data-models';
import { LoadTicketDone, PartialAppState, ticketsQuery } from '@tuskdesk-suite/tickets-state';
import { TicketTimerService } from '../ticket-timer.service';
import { TicketService } from '@tuskdesk-suite/backend';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket>;
  comments$: Observable<TicketComment[]>;
  ticketMessage = new FormControl();
  timer$: Observable<number>;
  markedToWork$: Observable<boolean>;

  constructor(
    private store: Store<PartialAppState>,
    private route: ActivatedRoute,
    private service: TicketService,
    private ticketTimerService: TicketTimerService,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.markedToWork$ = this.ticketTimerService.ticketsToWork$.pipe(
        untilViewDestroyed(this.elRef),
        map(tickets => {
          return tickets.indexOf(id) !== -1;
        })
      );

      this.ticket$ = this.store.pipe(
        select(ticketsQuery.getAllTickets),
        map(tickets => tickets.find(ticket => ticket.id === id))
      );

      this.service.ticketById(id).subscribe(ticket => {
        this.store.dispatch(new LoadTicketDone(ticket));
      });
    });
  }

  switchToEdit() {}

  cancelEdit() {}

  saveEdit() {}

  startTimer() {
    this.timer$ = this.ticketTimerService.timer$;
  }

  markToWork(ticketId: number) {
    this.ticketTimerService.addTicketToWork(ticketId);
  }
}
