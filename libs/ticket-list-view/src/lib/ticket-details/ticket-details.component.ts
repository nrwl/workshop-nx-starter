import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Ticket, TicketComment } from '@tuskdesk-suite/data-models';
import { TicketService } from '@tuskdesk-suite/backend';
import { TicketTimerService } from '../ticket-timer.service';

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

  constructor(
    private service: TicketService,
    private route: ActivatedRoute,
    private tickerTimerService: TicketTimerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.ticket$ = this.service.ticketById(id);
    });
  }

  switchToEdit() {}

  cancelEdit() {}

  saveEdit() {}

  startTimer() {
    this.timer$ = this.tickerTimerService.timer$;
  }

  markToWork(ticketId: number) {}
}
