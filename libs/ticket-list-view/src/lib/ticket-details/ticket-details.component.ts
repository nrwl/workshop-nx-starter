import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators';
import { untilViewDestroyed } from '@tuskdesk-suite/utils';

import { TicketsFacade } from '@tuskdesk-suite/tickets-state';
import { TicketTimerService } from '../ticket-timer.service';
import { TicketComment } from '@tuskdesk-suite/data-models';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticketMessage = new FormControl();

  loading$ = this.facade.isLoading$;
  ticket$ = this.facade.selectedTicket$;

  timer$: Observable<number>;
  comments$: Observable<TicketComment[]>;
  markedToWork$: Observable<boolean>;

  constructor(
    private facade: TicketsFacade,
    private route: ActivatedRoute,
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
    });
  }

  startTimer() {
    this.timer$ = this.ticketTimerService.timer$;
  }

  markToWork(ticketId: number) {
    this.ticketTimerService.addTicketToWork(ticketId);
  }
}
