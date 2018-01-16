import { Injectable, Optional } from '@angular/core';
import { ApiConfig } from '@tuskdesk-suite/backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventLog } from '@tuskdesk-suite/data-models';

@Injectable()
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
