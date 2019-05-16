import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { User } from '@tuskdesk-suite/data-models';
import { SearchFacade, SearchResult } from '../search.facade';
import { untilViewDestroyed } from '@tuskdesk-suite/utils';

@Component({
  selector: 'app-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsComponent implements OnInit {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();

  users$: Observable<string[]> = this.facade
    .searchUsers(this.assignedToUser.valueChanges)
    .pipe(untilViewDestroyed(this.elRef), map(extractFullName));

  searchResults$: Observable<SearchResult[]> = this.facade
    .searchTickets(this.searchTerm.valueChanges, this.assignedToUser.valueChanges)
    .pipe(untilViewDestroyed(this.elRef));

  constructor(private facade: SearchFacade, private elRef: ElementRef) {}

  ngOnInit() {
    this.facade.searchCriteria$.pipe(take(1)).subscribe(criteria => {
      this.searchTerm.patchValue(criteria.ticket, { emitEvent: false });
      this.assignedToUser.patchValue(criteria.user, { emitEvent: false });
    });
  }
}

function extractFullName(users: User[]) {
  return users.map(it => it.fullName);
}
