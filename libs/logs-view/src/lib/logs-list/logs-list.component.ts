import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'logs-logs-list',
  template: `
    <div *ngFor="let log of logs">
      {{log.message}}
    </div>
  `,
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent {
  logs = [{ message: 'log one' }, { message: 'log two' }];
}
