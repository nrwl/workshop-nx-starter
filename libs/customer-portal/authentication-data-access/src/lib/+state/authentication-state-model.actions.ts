import { createAction, props } from '@ngrx/store';
import { User } from '@tuskdesk-suite/shared/user-utils';

export const loadLoggedInUser = createAction(
  'LOAD_LOGGED_IN_USER',
  props<{ userId: number }>()
);

export const loggedInUserLoaded = createAction(
  'LOGGED_IN_USER_LOADED',
  props<{ user: User }>()
);

export const loggedInUserError = createAction(
  'LOAD_LOGGED_IN_USER_FAILED',
  props<{ error: any }>()
);
