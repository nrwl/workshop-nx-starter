import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TicketService, UserService } from '@tuskdesk-suite/backend';
import { User } from '@tuskdesk-suite/data-models';
import { of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  id: number;
  message: string;
  status: string;
}

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
  searchResults$: Observable<SearchResult[]>;

  users$: Observable<string[]> = this.assignedToUser.valueChanges.pipe(
    debounceTime(230),
    distinctUntilChanged(),
    filter(value => value.length > 0),
    switchMap(searchTerm => {
      const extractFullNames = users => users.map(it => it.fullName);
      const request$ = this.userService.users(searchTerm);

      return !searchTerm ? of([]) : request$.pipe(map(extractFullNames));
    })
  );

  constructor(private ticketService: TicketService, private userService: UserService) {}

  setAssignedToUser(value) {
    this.assignedToUser.patchValue(value, { emitEvent: false });
  }

  submit() {
    this.searchResults$ = this.ticketService.searchTickets(this.searchTerm.value, this.assignedToUser.value);
  }
}
