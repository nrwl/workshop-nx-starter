import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  TicketService,
  UserService
} from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { User } from '@tuskdesk-suite/shared/user-utils';
import { Subscription } from 'rxjs';

interface SearchResult {
  id: number;
  message: string;
  status: string;
}

@Component({
  selector: 'tuskdesk-suite-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsComponent implements OnInit, OnDestroy {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();

  usersFound: User[];
  searchResults$: Observable<SearchResult[]>;
  subscription: Subscription;

  constructor(
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscription = this.assignedToUser.valueChanges.subscribe(
      searchTerm => {
        this.userService.users(searchTerm).subscribe(users => {
          this.usersFound = users;
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submit() {
    this.searchResults$ = this.ticketService.searchTickets(
      this.searchTerm.value,
      this.assignedToUser.value
    );
  }
}
