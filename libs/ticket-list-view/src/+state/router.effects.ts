import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RouterEffects {
  @Effect()
  loadTickets = this.d.navigation(TicketListComponent, {
    run: (a: ActivatedRouteSnapshot) => {
      return {
        type: 'LOAD_TICKETS'
      };
    },
    onError: (a: ActivatedRouteSnapshot, e: any) => {
      return null;
    }
  });

  constructor(private actions: Actions, private d: DataPersistence<any>) {}
}
