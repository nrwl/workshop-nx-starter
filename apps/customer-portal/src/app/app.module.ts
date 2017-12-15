import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BackendModule, BackendUserIdService, LoggedInUserInterceptor } from '@tuskdesk-suite/backend';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthenticationStateModule } from '@tuskdesk-suite/authentication-state';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggedInUserIdService } from './logged-in-user-id.service';

@NgModule({
  imports: [
    BrowserModule,
    BackendModule.forRoot(),
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: '@tuskdesk-suite/ticket-list-view#TicketListViewModule'
        }
      ],
      { initialNavigation: true }
    ),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AuthenticationStateModule,
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
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
