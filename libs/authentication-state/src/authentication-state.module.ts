import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authenticationStateModelReducer } from './+state/authentication-state-model.reducer';
import { authenticationStateModelInitialState } from './+state/authentication-state-model.init';
import { AuthenticationStateModelEffects } from './+state/authentication-state-model.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('authenticationStateModel', authenticationStateModelReducer, {
      initialState: authenticationStateModelInitialState
    }),
    EffectsModule.forFeature([AuthenticationStateModelEffects])
  ],
  providers: [AuthenticationStateModelEffects]
})
export class AuthenticationStateModule {}
