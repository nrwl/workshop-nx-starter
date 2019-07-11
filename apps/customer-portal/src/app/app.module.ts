import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

const metaReducers = !environment.production ? [] : [];
const StoreDevTools = !environment.production
  ? StoreDevtoolsModule.instrument()
  : [];

const runtimeChecks = !environment.production
  ? {
      strictStateImmutability: true,
      strictActionImmutability: true
    }
  : {};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@tuskdesk-suite/client/customer-portal/tickets-feature').then(
              module => module.ClientCustomerPortalTicketsFeatureModule
            )
        }
      ],
      { initialNavigation: true }
    ),
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevTools
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
