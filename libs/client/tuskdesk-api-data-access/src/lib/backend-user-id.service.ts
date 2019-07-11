import { Injectable } from '@angular/core';

@Injectable()
export abstract class BackendUserIdService {
  get userId(): number {
    throw Error('not implemented');
  }
}
