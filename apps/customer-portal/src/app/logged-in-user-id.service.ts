import { Injectable } from '@angular/core';
import { BackendUserIdService } from '@tuskdesk-suite/backend';

@Injectable()
export class LoggedInUserIdService implements BackendUserIdService {
  constructor() {}

  get userId(): number {
    return 1;
  }
}
