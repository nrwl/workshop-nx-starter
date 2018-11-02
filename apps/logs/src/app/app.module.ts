import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

import { LogsBackendModule } from '@tuskdesk-suite/logs-backend';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: '@tuskdesk-suite/logs-view#LogsViewModule'
        }
      ],
      {
        initialNavigation: 'enabled'
      }
    ),
    LogsBackendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
