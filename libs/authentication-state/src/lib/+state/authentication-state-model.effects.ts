import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { LoadLoggedInUser } from './authentication-state-model.actions';
import { UserService } from '@tuskdesk-suite/backend';

@Injectable()
export class AuthenticationStateModelEffects {
  @Effect()
  loadLoggedInUser = this.d.fetch('LOAD_LOGGED_IN_USER', {
    run: (a: LoadLoggedInUser) => {
      return this.userService.userById(a.payload).pipe(
        map(user => {
          return {
            type: 'LOGGED_IN_USER_LOADED',
            payload: user
          };
        })
      );
    },

    onError: (a: LoadLoggedInUser, error) => {
      return { type: 'LOAD_LOGGED_IN_USER_FAILED' };
    }
  });

  constructor(private actions: Actions, private d: DataPersistence<any>, private userService: UserService) {}
}
