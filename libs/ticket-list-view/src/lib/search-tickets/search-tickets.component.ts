import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TicketService, UserService } from '@tuskdesk-suite/backend';
import { User } from '@tuskdesk-suite/data-models';
import { Subscription } from 'rxjs';

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
export class SearchTicketsComponent implements OnInit, OnDestroy {
  users: User[];
  searchTerm = new FormControl();
  assignedToUser = new FormControl();
  searchResults$: Observable<SearchResult[]>;
  subscription: Subscription;

  constructor(private ticketService: TicketService, private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.assignedToUser.valueChanges.subscribe(searchTerm => {
      this.userService.users(searchTerm).subscribe(users => {
        this.users = users;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setAssignedToUser(value) {
    this.assignedToUser.patchValue(value, { emitEvent: false });
  }

  submit() {
    this.searchResults$ = this.ticketService.searchTickets(this.searchTerm.value, this.assignedToUser.value);
  }
}
