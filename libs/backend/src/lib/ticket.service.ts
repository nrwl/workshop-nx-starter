import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '@tuskdesk-suite/shared/ticket-utils';
import { Comment } from '@tuskdesk-suite/shared/comment-utils';
import { ApiConfig } from './api-config';

@Injectable()
export class TicketService {
  private _rootUrl = '';

  constructor(
    @Optional() private apiConfig: ApiConfig,
    private http: HttpClient
  ) {
    if (apiConfig) {
      this._rootUrl = apiConfig.rootUrl;
    }
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this._rootUrl}/api/tickets`);
  }

  searchTickets(
    searchTerm: string,
    assignedToUser: string = ''
  ): Observable<Ticket[]> {
    const params = {};
    if (searchTerm) {
      params['searchTerm'] = searchTerm;
    }
    if (assignedToUser) {
      params['assignedToUser'] = assignedToUser;
    }
    return this.http.get<Ticket[]>(`${this._rootUrl}/api/tickets`, { params });
  }

  ticketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this._rootUrl}/api/tickets/${id}`);
  }

  comments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this._rootUrl}/api/tickets/${id}/comments`
    );
  }

  updateTicketMessage(id: number, message: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this._rootUrl}/api/tickets`, {
      id,
      message
    });
  }

  addComment(ticketId: number, message: string): Observable<Comment> {
    return this.http.post<Comment>(`${this._rootUrl}/api/comments`, {
      ticketId,
      message
    });
  }
}
