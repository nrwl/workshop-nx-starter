import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  private ticketsToWork = new BehaviorSubject<number[]>([]);
  readonly workRegistry = [];
  readonly ticketsToWork$ = this.ticketsToWork.asObservable();

  addTicketToWork(ticketId: number) {
    const list = this.workRegistry;
    if (list.indexOf(ticketId) === -1) {
      list.push(ticketId);
    }
    this.ticketsToWork.next([...list]);
  }
}
