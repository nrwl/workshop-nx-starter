import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EventLog } from '@tuskdesk-suite/data-models';
import { ApiConfig } from '@tuskdesk-suite/backend';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private _rootUrl = '';

  constructor(@Optional() private apiConfig: ApiConfig, private http: HttpClient) {
    if (apiConfig) {
      this._rootUrl = apiConfig.rootUrl;
    }
  }
  logs(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${this._rootUrl}/api/eventlogs`);
  }
}
