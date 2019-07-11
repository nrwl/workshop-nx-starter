import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Company } from '@tuskdesk-suite/shared/company-utils';
import { User } from '@tuskdesk-suite/shared/user-utils';
import { ApiConfig } from './api-config';

@Injectable()
export class CompanyService {
  private _rootUrl = '';

  constructor(
    @Optional() private apiConfig: ApiConfig,
    private http: HttpClient
  ) {
    if (apiConfig) {
      this._rootUrl = apiConfig.rootUrl;
    }
  }

  companies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this._rootUrl}/api/companies`);
  }

  company(id: number): Observable<Company> {
    return this.http.get<Company>(`${this._rootUrl}/api/companies/${id}`);
  }

  usersByCompany(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this._rootUrl}/api/companies/${id}/users`);
  }
}
