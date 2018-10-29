import { User } from '@tuskdesk-suite/data-models';

export interface LoadLoggedInUser {
  type: 'LOAD_LOGGED_IN_USER';
  payload: number;
}

export interface LoggedInUserLoaded {
  type: 'LOGGED_IN_USER_LOADED';
  payload: User;
}

export type AuthenticationStateModelAction = LoadLoggedInUser | LoggedInUserLoaded;
