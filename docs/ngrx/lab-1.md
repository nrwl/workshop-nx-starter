# NgRx Lab 1: Actions, Reducers, and Selectors

![image](https://user-images.githubusercontent.com/210413/47935906-02f1ae80-deaa-11e8-8cd7-0615e6234c76.png)

### Scenario

We have a **Customer Portal** application with **TicketList** and **TicketDetails** view components. Each component
uses the HttpClient to load appropriate ticket data and store that data directly into the component.

This is poor design since these components:

- do not share the data...
- always reload the data [since routing creates new instances of the views]...
- contain business logic to load the data

Let's use **NgRx** to store the data in a \*_Tickets_ NgRx state layer. This lab (and the subsequent 6 other labs) will show developers how
to use NgRx features and the beneficial impacts of NgRx on view components.

We already did some NgRx setup for you...

- The Customer Portal application already has its `apps/customer-portal/src/app/app.module.ts` configured with NgRx
- A **TicketsState** feature library `libs/client/customer-portal/tickets-data-access` with NgRx has also been created with initial actions, reducer, and selectors; but this feature has **not yet** been registered with the NgRx store.

> Take a moment to explore those files to quickly familiarize yourself with the NgRx artifacts and setup.

<br/>

### Code Instructions

In this lab, you will:

- Use a LoadTicketsDone actions to store REST ticket data in the NgRx store
- Use a tickets reducer to process the LoadTicketsDone action
- Use tickets selectors to build queries (into the NgRx state) for future ticket push-data

<br/>

---

##### In `tickets-state.module.ts`

1. Use `StoreModule.forFeature()` to register the _Tickets_ feature with the `ticketsReducer` and **FEATURE_TICKETS**.

```ts
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_TICKETS, ticketsReducer),
    EffectsModule.forFeature([])
  ]
})
export class ClientCustomerPortalTicketsDataAccessModule {}
```

> You Will also need to "Connect" your modules by importing this `ClientCustomerPortalTicketsDataAccessModule` to another module. Which module should that be?

##### In `ticket-details.component.ts`

1. Inject the `store: Store<any>` in the constructor
2. In `ngOnInit()`, use `ticketsQuery.getAllTickets` with `store.pipe(select())` to get a list of all available tickets and then use the router param ticket `id` to extract the ticket.
3. When the `service.ticketById(id)` returns the ticket, save that ticket to the NgRx state using `ticketLoaded`

> The `tickets.reducer.ts` already handles the `ticketLoaded` action... so no more work is needed here.

```ts
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket>;
  comments$: Observable<Comment[]>;
  ticketMessage = new FormControl();
  timer$: Observable<number>;
  private id$ = this.route.params.pipe(map(params => +params['id']));
  onDestroy$ = new Subject<void>();

  constructor(
    private store: Store<any>,
    private service: TicketService,
    private route: ActivatedRoute,
    private ticketTimerService: TicketTimerService
  ) {}

  ngOnInit() {
    // get a ticket to render to the UI
    this.ticket$ = combineLatest([
      this.store.pipe(select(ticketsQuery.getAllTickets)),
      this.id$
    ]).pipe(map(([tickets, id]) => tickets.find(ticket => ticket.id === id)));

    // retrieve the ticket from the api and stash it in the store
    this.id$
      .pipe(
        take(1),
        switchMap(id => this.service.ticketById(id)),
        tap(ticket => this.store.dispatch(ticketLoaded({ ticket })))
      )
      .subscribe();
  }
}
```

##### In `ticket-list.component.ts`

1. Inject the `store: Store<any>` in the constructor
2. In constructor, use the HttpClient `ticketService.getTickets()` to load the tickets and then save the ticket data to the NgRx state by dispatching a `allTicketsLoaded` action.
3. Prepare the `tickets$ : Observable<Ticket[]>` property using `this.store.pipe(select())` instead of the HttpClient service.

> Do not use imports that by-pass the library public api. E.g. `import { LoadTicketsDone } from '@tuskdesk-suite/tickets-state/src/...'`

---

<br/>

### Investigate

This improvement assumes that the NgRx **TicketsState** will contain the desired `ticket` for the ticket-details view. In what scenarios will this not work? Also, what would happen if you forgot to update the `tickets.reducer.ts` to process the `LoadTicketsDone` action?

Be prepared to discuss these issues and possible workarounds.

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

Go to NgRx Lab #2: [Composed Store Selectors](lab-2.md)
