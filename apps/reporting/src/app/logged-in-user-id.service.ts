import { Injectable } from '@angular/core';

@Injectable()
export class LoggedInUserIdService {
  constructor() {}

  get userId(): number {
    return 9;
  }
}
