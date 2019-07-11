import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Comment } from '@tuskdesk-suite/shared/comment-utils';
import { FormControl } from '@angular/forms';
import { TicketService } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket>;
  comments$: Observable<Comment[]>;
  ticketMessage = new FormControl();
  timer$: Observable<number>;

  constructor(private service: TicketService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.ticket$ = this.service.ticketById(id);
    });
  }

  switchToEdit() {}

  cancelEdit() {}

  saveEdit() {}

  startTimer() {}

  markToWork(ticketId: number) {}
}
