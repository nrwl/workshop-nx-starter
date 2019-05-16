import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { LoadTickets, RouterLoadTicket } from '@tuskdesk-suite/tickets-state';
import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { TicketDetailsComponent } from '@tuskdesk-suite/ticket-list-view/src/lib/ticket-details/ticket-details.component';

@Injectable()
export class RouterEffects {
  @Effect()
  loadView_TicketList$ = this.d.navigation(TicketListComponent, {
    run: (a: ActivatedRouteSnapshot) => {
      // Load all available tickets...
      return new LoadTickets();
    }
  });

  @Effect()
  loadView_TicketDetails$ = this.d.navigation(TicketDetailsComponent, {
    run: (a: ActivatedRouteSnapshot) => {
      const id = +a.paramMap.get('id');

      // Load ticket details
      return new RouterLoadTicket(id);
    }
  });

  constructor(private actions: Actions, private d: DataPersistence<any>) {}
}
