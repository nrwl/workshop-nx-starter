import { User } from '@tuskdesk-suite/data-models';

export interface AuthenticationStateModel {
  user: User;
}

export interface AuthenticationStateModelState {
  readonly authenticationStateModel: AuthenticationStateModel;
}
