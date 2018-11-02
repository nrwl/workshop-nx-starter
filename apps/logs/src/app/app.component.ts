import { Component } from '@angular/core';

@Component({
  selector: 'log-root',
  template: `
    <h1>TuskDesk {{title}}</h1>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Logs';
}
