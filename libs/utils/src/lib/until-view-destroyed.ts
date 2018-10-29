/**
 *  When manually subscribing to an observable in a view component, developers are traditionally required
 *  to unsubscribe during ngOnDestroy. This utility method auto-configures and manages that unsubscribe
 *  requirement by watching the DOM with a MutationObserver and internally using the takeUntil RxJS operator.
 *
 *  @code
 *
 *  import {untilViewDestroyed} from 'utils/untilViewDestroyed.ts'
 *
 *  @Component({})
 *  export class TicketDetails {
 *    search: FormControl;
 *
 *    constructor(private ticketService: TicketService, private elRef: ElementRef){}
 *
 *    ngOnInit() {
 *      this.search.valueChanges.pipe(
 *        untilViewDestroyed(elRef),
 *        switchMap(()=> this.ticketService.loadAll()),
 *        map(ticket=> ticket.name)
 *      )
 *      .subscribe( tickets => this.tickets = tickets );
 *    }
 *
 *  }
 *
 *  Utility method to hide complexity of bridging a view component instance to a manual observable subs
 */
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 *  Wait until the DOM element has been removed (destroyed) and then
 *  use `takeUntil()` to complete the source subscription.
 *
 *  If the `pipe(untilViewDestroyed(element.nativeEl))` is used in the constructor
 *  we must delay until the new view has been inserted into the DOM.
 */
export function untilViewDestroyed<T>(element: ElementRef): (source: Observable<T>) => Observable<T> {
  const destroyed$ = watchElementDestroyed(element.nativeElement);
  return (source: Observable<T>) => source.pipe(takeUntil(destroyed$));
}

/**
 * Unique hashkey
 */
const destroy$ = 'destroy$';

/**
 * Use MutationObserver to watch for Element being removed from the DOM: destroyed
 * When destroyed, stop subscriptions upstream.
 */
function watchElementDestroyed(nativeEl: Element, delay: number = 20): Observable<boolean> {
  if (!nativeEl[destroy$]) {
    const stop$ = new ReplaySubject<boolean>();
    const hasBeenRemoved = isElementRemoved(nativeEl);

    nativeEl[destroy$] = stop$.asObservable();
    setTimeout(() => {
      const domObserver = new MutationObserver((records: MutationRecord[]) => {
        if (records.some(hasBeenRemoved)) {
          stop$.next(true);
          stop$.complete();

          domObserver.disconnect();
          nativeEl[destroy$] = null;
        }
      });

      domObserver.observe(nativeEl.parentNode, { childList: true });
    }, delay);
  }

  return nativeEl[destroy$];
}

function isElementRemoved(nativeEl) {
  return (record: MutationRecord) => {
    return Array.from(record.removedNodes).indexOf(nativeEl) > -1;
  };
}
