import { Component, OnInit } from '@angular/core';
import { LogService } from '@tuskdesk-suite/client/logs/data-access';

@Component({
  selector: 'tuskdesk-suite-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent {
  logs = this.logService.logs();

  constructor(private logService: LogService) {}
}
