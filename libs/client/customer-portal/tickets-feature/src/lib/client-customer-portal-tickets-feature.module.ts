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
import { ClientSharedTuskdeskApiDataAccessModule } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UiMaterialModule,
    StoreRouterConnectingModule,
    ClientSharedTuskdeskApiDataAccessModule,
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
export class ClientCustomerPortalTicketsFeatureModule {}
