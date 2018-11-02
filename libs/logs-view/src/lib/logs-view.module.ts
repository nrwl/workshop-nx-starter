import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogsListComponent } from './logs-list/logs-list.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: LogsListComponent }])],
  declarations: [LogsListComponent]
})
export class LogsViewModule {}
