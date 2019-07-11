import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  TicketService,
  UserService
} from '@tuskdesk-suite/client/shared/tuskdesk-api-data-access';
import { User } from '@tuskdesk-suite/shared/user-utils';

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

  usersFound: User[];
  searchResults$: Observable<SearchResult[]>;

  constructor(
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  submit() {}
}
