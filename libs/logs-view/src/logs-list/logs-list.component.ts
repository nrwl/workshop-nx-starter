import { Component, OnInit } from '@angular/core';
import { LogService } from '@tuskdesk-suite/logs-backend';
import { EventLog } from '@tuskdesk-suite/data-models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {
  logs$: Observable<EventLog[]>;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logs$ = this.logService.logs();
  }
}
