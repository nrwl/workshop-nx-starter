import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  BackendModule,
  BackendUserIdService,
  LoggedInUserInterceptor
} from '@tuskdesk-suite/backend';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NxModule } from '@nrwl/angular';
import { LoggedInUserIdService } from './logged-in-user-id.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    BackendModule.forRoot(),
    NxModule.forRoot(),
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent }
    ])
  ],
  declarations: [DashboardComponent],
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
export class ReportingFeatureModule {}
