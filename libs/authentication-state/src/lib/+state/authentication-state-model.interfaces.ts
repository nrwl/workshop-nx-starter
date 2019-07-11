import { User } from '@tuskdesk-suite/shared/user-utils';

export interface AuthenticationStateModel {
  user: User;
}

export interface AuthenticationStateModelState {
  readonly authenticationStateModel: AuthenticationStateModel;
}
