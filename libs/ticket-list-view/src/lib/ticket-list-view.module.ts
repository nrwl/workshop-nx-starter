import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { TicketsStateModule } from '@tuskdesk-suite/tickets-state';

import { TicketListViewRoutingModule } from './ticket-list-view.routing.module';
import { TicketTimerService } from './ticket-timer.service';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { SearchTicketsComponent } from './search-tickets/search-tickets.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    TicketListViewRoutingModule,
    TicketsStateModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule
  ],
  declarations: [TicketListComponent, TicketDetailsComponent, SearchTicketsComponent],
  providers: [TicketTimerService]
})
export class TicketListViewModule {}
