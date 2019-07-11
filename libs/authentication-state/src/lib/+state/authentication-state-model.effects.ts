import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { UserService } from '@tuskdesk-suite/client/tuskdesk-api-data-access';
import { map } from 'rxjs/operators';
import {
  loadLoggedInUser,
  loggedInUserError,
  loggedInUserLoaded
} from './authentication-state-model.actions';

@Injectable()
export class AuthenticationStateModelEffects {
  loadLoggedInUser = createEffect(() =>
    this.d.fetch(loadLoggedInUser.type, {
      run: (a: ReturnType<typeof loadLoggedInUser>) =>
        this.userService
          .userById(a.userId)
          .pipe(map(user => loggedInUserLoaded({ user }))),
      onError: (a: ReturnType<typeof loadLoggedInUser>, error) =>
        loggedInUserError({ error })
    })
  );

  constructor(
    private d: DataPersistence<any>,
    private userService: UserService
  ) {}
}
