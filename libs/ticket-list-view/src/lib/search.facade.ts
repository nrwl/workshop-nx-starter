import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable, combineLatest } from 'rxjs';
import { switchMap, distinctUntilChanged, debounceTime, map, startWith, tap } from 'rxjs/operators';

import { TicketService, UserService } from '@tuskdesk-suite/backend';
import { User } from '@tuskdesk-suite/data-models';

/**
 * Ticket Seach Criteria
 */
export interface SearchCriteria {
  ticket: string;
  user: string;
}

/**
 * Ticket search results
 */
export interface SearchResult {
  id: number;
  message: string;
  status: string;
}

/**
 * Internal state managed by the Facade
 */
class SearchState {
  users: User[] = [];
  tickets: SearchResult[];
  criteria: SearchCriteria = {
    user: 'j',
    ticket: ''
  };
}

@Injectable({
  providedIn: 'root'
})
export class SearchFacade {
  private state = new SearchState();
  private dispatch = new BehaviorSubject<SearchState>(this.state);

  /**
   * Stream to current list of ticket search results
   */
  searchResults$: Observable<SearchResult[]> = this.dispatch
    .asObservable()
    .pipe(startWith(this.state), map(state => state.tickets));

  /**
   * Observable for all search criteria
   */
  searchCriteria$: Observable<SearchCriteria> = this.dispatch
    .asObservable()
    .pipe(startWith(this.state), map(state => state.criteria));

  /**
   * Constructor
   */
  constructor(private ticketService: TicketService, private userService: UserService) {}

  /**
   *
   * Build an Observable pipeline to matching usersbased on the value contained
   * in the 'Assigned to:' input control values
   *
   */
  searchUsers(source$: Observable<string>, debounceMs = 250): Observable<User[]> {
    return source$.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap((user: string) => {
        return !user ? of([]) : this.userService.users(user);
      })
    );
  }

  /**
   *
   * Build an Observable  pipeline to ticket search results based on the value contained
   * in the 'Find Tickets:' input control values
   *
   */
  searchTickets(
    searchBy$: Observable<string>,
    user$: Observable<string>,
    debounceMs = 250
  ): Observable<SearchResult[]> {
    const criteria = this.state.criteria;
    // throttle both searchBy and user input triggers
    combineLatest(
      searchBy$.pipe(debounceTime(debounceMs), distinctUntilChanged(), startWith(criteria.ticket)),
      user$.pipe(debounceTime(debounceMs), distinctUntilChanged(), startWith(criteria.user))
    )
      .pipe(
        switchMap(([ticket, user]) => {
          this.updateCriteria(ticket, user);
          const hasCriteria = ticket.length || user.length;
          return !hasCriteria ? of([]) : this.ticketService.searchTickets(ticket, user);
        })
      )
      .subscribe(this.updateTickets.bind(this));

    return this.searchResults$;
  }

  /**
   * Update search criteria for "Assigned To:"
   * Note: maintains 'state' immutability
   */
  updateCriteria(ticket: string, user: string) {
    const criteria = { ...this.state.criteria, user, ticket };
    this.dispatch.next(
      (this.state = {
        ...this.state,
        criteria
      })
    );
  }

  private updateTickets(tickets: SearchResult[]) {
    this.dispatch.next(
      (this.state = {
        ...this.state,
        tickets
      })
    );
  }
}
