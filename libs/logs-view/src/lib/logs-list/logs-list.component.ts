import { Component } from '@angular/core';

import { LogService } from '@tuskdesk-suite/logs-backend';

@Component({
  selector: 'logs-logs-list',
  template: `
    <div *ngFor="let log of (logs$ | async)">
      {{log.message}}
    </div>
  `,
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent {
  logs$ = this.logService.logs();

  constructor(private logService: LogService) {}
}
