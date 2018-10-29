import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyService, TicketService } from '@tuskdesk-suite/backend';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  model$;

  constructor(private companyService: CompanyService, private ticketService: TicketService) {}

  ngOnInit() {
    this.model$ = this.companyService.companies().pipe(
      mergeMap(companies =>
        this.ticketService.getTickets().pipe(
          map(tickets => {
            return {
              totalTickets: tickets.length,
              totalOpenTickets: tickets.filter(t => t.status === 'open').length,
              totalCompanies: companies.length
            };
          })
        )
      )
    );
  }
}
