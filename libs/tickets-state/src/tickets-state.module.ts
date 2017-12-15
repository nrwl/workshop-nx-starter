import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ticketsStateModelReducer } from './+state/tickets-state-model.reducer';
import { ticketsStateModelInitialState } from './+state/tickets-state-model.init';
import { TicketsStateModelEffects } from './+state/tickets-state-model.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('ticketsStateModel', ticketsStateModelReducer, {
      initialState: ticketsStateModelInitialState
    }),
    EffectsModule.forFeature([TicketsStateModelEffects])
  ],
  providers: [TicketsStateModelEffects]
})
export class TicketsStateModule {}
