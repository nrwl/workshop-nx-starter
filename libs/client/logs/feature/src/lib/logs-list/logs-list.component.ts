import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tuskdesk-suite-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {
  logs: { message: string }[];

  constructor() {}

  ngOnInit() {
    this.logs = [{ message: 'log one' }, { message: 'log two' }];
  }
}
