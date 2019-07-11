import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer } from './+state/authentication-state-model.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationStateModelEffects } from './+state/authentication-state-model.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('authenticationStateModel', reducer),
    EffectsModule.forFeature([AuthenticationStateModelEffects])
  ],
  providers: [AuthenticationStateModelEffects]
})
export class ClientCustomerPortalAuthenticationDataAccessModule {}
