import { AuthenticationStateModel } from './authentication-state-model.interfaces';
import { createReducer, on, Action } from '@ngrx/store';
import { loggedInUserLoaded } from './authentication-state-model.actions';
import { authenticationStateModelInitialState } from './authentication-state-model.init';

const featureReducer = createReducer(
  authenticationStateModelInitialState,
  on(loggedInUserLoaded, (state, { user }) => ({
    ...state,
    user
  }))
);

export function reducer(
  state: AuthenticationStateModel | undefined,
  action: Action
) {
  return featureReducer(state, action);
}
