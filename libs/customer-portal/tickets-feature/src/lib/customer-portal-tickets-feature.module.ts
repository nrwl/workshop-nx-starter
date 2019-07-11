import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchTicketsComponent } from './search-tickets/search-tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiMaterialModule } from './ui-material.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ClientTuskdeskApiDataAccessModule } from '@tuskdesk-suite/client/tuskdesk-api-data-access/src';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UiMaterialModule,
    StoreRouterConnectingModule,
    ClientTuskdeskApiDataAccessModule,
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
    ])
  ],
  declarations: [
    SearchTicketsComponent,
    TicketListComponent,
    TicketDetailsComponent
  ]
})
export class CustomerPortalTicketsFeatureModule {}
