import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TicketTimerService {
  readonly timer$ = Observable.create(observer => {
    let count = 0;

    const intervalId = setInterval(_ => {
      observer.next(++count);
    }, 350);
    observer.next(++count);

    return () => clearInterval(intervalId);
  });
}
