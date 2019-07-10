import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NxModule } from '@nrwl/angular';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import {
  BackendModule,
  BackendUserIdService,
  LoggedInUserInterceptor
} from '@tuskdesk-suite/backend';
import { AuthenticationStateModule } from '@tuskdesk-suite/authentication-state';
import { LoggedInUserIdService } from './logged-in-user-id.service';
import { APP_ROUTES } from './app.routes';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    BackendModule.forRoot(),
    FlexLayoutModule,
    NxModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, { initialNavigation: true }),
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks
      }
    ),
    EffectsModule.forRoot([]),
    AuthenticationStateModule,
    StoreRouterConnectingModule.forRoot(),
    StoreDevTools
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: BackendUserIdService,
      useClass: LoggedInUserIdService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggedInUserInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
