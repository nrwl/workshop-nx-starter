import { AuthenticationStateModel } from './authentication-state-model.interfaces';
import { AuthenticationStateModelAction } from './authentication-state-model.actions';

export function authenticationStateModelReducer(
  state: AuthenticationStateModel,
  action: AuthenticationStateModelAction
): AuthenticationStateModel {
  switch (action.type) {
    case 'LOGGED_IN_USER_LOADED': {
      return { ...state, user: action.payload };
    }
    default: {
      return state;
    }
  }
}
