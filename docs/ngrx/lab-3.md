# NgRx Lab 3: Effects and Redux Tools

### Scenario

Our Tickets view components use the HttpClient service to directly load ticket REST data. This is another poor design... views should never know how to load REST data.

Such async activity should be relegated to NgRx **Effects** classes!

![image](https://user-images.githubusercontent.com/210413/47959514-0d986a80-dfb4-11e8-9a6f-a52c53cbbdcd.png)

<br/>

### Code Instructions

In this lab, you will:

- Create an Effects class to handle async activity to load ticket REST data
- Update the view components to remove HttpClient usages; replaced with **LoadTicket** actions

<br/>

---

##### In `libs/tickets-state/src/lib/+state/tickets.effects.ts`

1. Implement a `loadAllTickets$` effect that uses `this.actions.pipe()` for `loadALlTickets`, calls `ticketService.getTickets()` and then dispatches an `allTicketsLoaded` action.
2. Implement a `loadTicket$` property that uses `this.actions.pipe()` for `loadTicket`, calls `ticketService.ticketById()` and then dispatches a `ticketLoaded` action.

> Do not forget to register this Effects class in the `tickets-state.module.ts` **EffectsModule.forFeature()**

##### In `ticket-list.component.ts`

1. Remove the usage of `this.service.getTickets()`
2. Simply dispatch a `LoadTickets` action.

##### In `ticket-details.component.ts`

1. Dispatch a `LoadTicket` action in the `ngOnInit()`

<br/>

### Code Snippets

###### `tickets.effects.ts`

```ts
@Injectable()
export class TicketEffects {
  loadAllTickets$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadAllTickets),
      switchMap(() => this.ticketService.getTickets()),
      map(tickets => allTicketsLoaded({ tickets }))
    )
  );

  ticketLoaded$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadTicket),
      map(action => action.ticketId),
      switchMap(ticketId => this.ticketService.ticketById(ticketId)),
      map(ticket => ticketLoaded({ ticket }))
    )
  );

  constructor(
    private store: Store<any>,
    private actions: Actions,
    private ticketService: TicketService
  ) {}
}
```

###### `tickets-list.component.ts`

```ts
export class TicketListComponent {
  tickets$: Observable<Ticket[]> = this.store.pipe(
    select(ticketsQuery.getAllTickets)
  );

  constructor(private store: Store<any>) {
    this.store.dispatch(loadAllTickets());
  }
}
```

###### `ticket-details.component.ts`

```ts
ngOnInit() {
  // get a ticket to render to the UI
  this.ticket$ = combineLatest([
    this.store.pipe(select(ticketsQuery.getAllTickets)),
    this.id$
  ]).pipe(map(([tickets, id]) => tickets.find(ticket => ticket.id === id)));

  // request a ticket
  this.id$
    .pipe(
      take(1),
      tap(ticketId => this.store.dispatch(loadTicket({ ticketId })))
    )
    .subscribe();
}
```

<br/>

---

<br/>

### Investigate

Why are we dispatching a LoadTicket action in the TicketDetails component? What issue does this solve.

### Using Redux DevTools

Open the Redux DevTools in Browser and watch the state changes and you route in the Customer-Portal application.

![image](https://user-images.githubusercontent.com/210413/47936825-f1f66c80-deac-11e8-8a17-d80f742bfdee.png)

> Install Chrome Extension: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

<br/>

### Running the Application

- Open the **Customer Portal** application with the browser: http://localhost:4203
- Confirm the **Node Server** is running with browser page: http://localhost:3000/api/tickets

Run the following command:

```console
ng run customer-portal:serve-with-api
```

> If you already have one(s) running and need to restart, you can stop the run with `ctrl+c`.

<br/>

---

<br/>

### Next Lab

Go to NgRx Lab #4: [Use Entity-like Pattern](lab-4.md)
