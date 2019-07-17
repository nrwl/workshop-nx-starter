import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { EventLog } from '@tuskdesk-suite/shared/event-log-utils';
import { Observable } from 'rxjs';

@Injectable()
export class LogService {
  private _rootUrl = '';

  constructor(
    @Optional() private apiConfig: ApiConfig,
    private http: HttpClient
  ) {
    if (apiConfig) {
      this._rootUrl = apiConfig.rootUrl;
    }
  }

  logs(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${this._rootUrl}/api/event-logs`);
  }
}
