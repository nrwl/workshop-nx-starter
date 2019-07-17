import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogsListComponent } from './logs-list/logs-list.component';
import { ClientLogsDataAccessModule } from '@tuskdesk-suite/client/logs/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LogsListComponent }
    ]),
    ClientLogsDataAccessModule
  ],
  declarations: [LogsListComponent]
})
export class ClientLogsFeatureModule {}
