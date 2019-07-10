import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationStateModelEffects } from './+state/authentication-state-model.effects';
import { reducer } from './+state/authentication-state-model.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('authenticationStateModel', reducer),
    EffectsModule.forFeature([AuthenticationStateModelEffects])
  ],
  providers: [AuthenticationStateModelEffects]
})
export class AuthenticationStateModule {}
