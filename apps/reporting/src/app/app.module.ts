import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { Route, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggedInUserIdService } from './logged-in-user-id.service';
import { BackendModule, BackendUserIdService, LoggedInUserInterceptor } from '@tuskdesk-suite/backend';
import { DashboardComponent, ReportingDashboardViewModule } from '@tuskdesk-suite/reporting-dashboard-view';

const routes: Route[] = [{ path: '', component: DashboardComponent, pathMatch: 'full' }];

@NgModule({
  imports: [
    BrowserModule,
    BackendModule.forRoot(),
    ReportingDashboardViewModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
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
