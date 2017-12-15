import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterEffects } from './+state/router.effects';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { SearchTicketsComponent } from './search-tickets/search-tickets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketsStateModule } from '@tuskdesk-suite/tickets-state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: TicketListComponent
      },
      {
        path: 'ticket/:id',
        component: TicketDetailsComponent
      },
      {
        path: 'search',
        component: SearchTicketsComponent
      }
    ]),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule,
    TicketsStateModule
  ],
  declarations: [TicketListComponent, TicketDetailsComponent, SearchTicketsComponent]
})
export class TicketListViewModule {}
