import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TicketService, UserService } from '@tuskdesk-suite/backend';
import { User } from '@tuskdesk-suite/data-models';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

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
      const request$ = this.userService.users(searchTerm);
      return !searchTerm ? of([]) : request$.pipe(map(extractFullNames));
    })
  );

  constructor(private ticketService: TicketService, private userService: UserService) {}

  submit() {
    this.searchResults$ = this.ticketService.searchTickets(this.searchTerm.value, this.assignedToUser.value);
  }
}

function extractFullNames(users: User[]): string[] {
  return users.map(it => it.fullName);
}
