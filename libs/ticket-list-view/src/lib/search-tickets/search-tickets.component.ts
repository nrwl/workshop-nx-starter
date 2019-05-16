import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TicketService, UserService } from '@tuskdesk-suite/backend';
import { User } from '@tuskdesk-suite/data-models';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, combineLatest, startWith, filter } from 'rxjs/operators';

interface SearchResult {
  id: number;
  message: string;
  status: string;
}

@Component({
  selector: 'app-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsComponent {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();

  searchResults$: Observable<SearchResult[]> = of([]).pipe(
    combineLatest(
      limitCalls(this.searchTerm.valueChanges).pipe(startWith('')),
      limitCalls(this.assignedToUser.valueChanges).pipe(startWith(''))
    ),
    filter(([_, description, user]) => description.length || user.length),
    switchMap(([_, description, user]) => this.ticketService.searchTickets(description, user))
  );

  users$: Observable<string[]> = limitCalls(this.assignedToUser.valueChanges).pipe(
    switchMap(searchTerm => {
      const request$ = this.userService.users(searchTerm);
      return !searchTerm ? of([]) : request$.pipe(map(extractFullNames));
    })
  );

  constructor(private ticketService: TicketService, private userService: UserService) {}
}

function extractFullNames(users: User[]): string[] {
  return users.map(it => it.fullName);
}

function limitCalls(source$: Observable<any>): Observable<any> {
  return source$.pipe(debounceTime(230), distinctUntilChanged());
}
