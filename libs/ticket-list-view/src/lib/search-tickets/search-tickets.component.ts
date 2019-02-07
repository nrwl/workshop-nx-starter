import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { TicketService, UserService } from '@tuskdesk-suite/backend';

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
export class SearchTicketsComponent implements OnInit {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();

  searchResults$: Observable<SearchResult[]>;
  users$: Observable<string[]>;

  constructor(private ticketService: TicketService, private userService: UserService) {}

  ngOnInit(): void {
    const users$ = throttle(this.assignedToUser.valueChanges);
    const searchBy$ = throttle(this.searchTerm.valueChanges);

    this.searchResults$ = combineLatest(searchBy$, users$).pipe(
      switchMap(([ticket, user]) => {
        const hasCriteria = ticket.length || user.length;
        return !hasCriteria ? of([]) : this.ticketService.searchTickets(ticket, user);
      })
    );

    this.users$ = users$.pipe(
      switchMap(searchTerm => {
        const extractFullNames = users => users.map(it => it.fullName);
        const request$ = this.userService.users(searchTerm);

        return !searchTerm ? of([]) : request$.pipe(map(extractFullNames));
      })
    );
  }
}

function throttle(source$: Observable<string>) {
  return source$.pipe(debounceTime(350), distinctUntilChanged(), startWith(''));
}
