import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TicketsEffects } from './+state/tickets.effects';

import { FEATURE_TICKETS, getInitialState, ticketsReducer } from './+state/tickets.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_TICKETS, ticketsReducer, { initialState: getInitialState }),
    EffectsModule.forFeature([TicketsEffects])
  ],
  providers: []
})
export class TicketsStateModule {}
