# NgRx Lab 4: Use Entity-like Pattern

### Scenario

Often NgRx solutions contain large collections of data items with subsequent CRUD code in the Reducers. Before using **@ngrx/entity** to solve those issues, let's manually create a entity-like solution... to explore simple concepts and benefits.

<br/>

### Code Instructions

In this lab, you will update the TicketsState to use entity-like patterns in the following NgRx artifacts:

- `tickets.interfaces.ts`
- `tickets.reducer.ts`
- `tickets.selectors.ts`

We will also introduce the support of a **selected** ticket in our TicketsState.

> Note that no view components will need to be updated. This is only an NgRx-layer change!

<br/>

---

##### In `tickets.interfaces.ts`

1. Replace the `list` property with `entities` and `ids`. Define an interface for the `entities`

```ts
export interface TicketDictionary {
  [key: number]: Ticket;
}
```

2. Add a `selectedId: number` property.

##### In `tickets.reducer.ts`

1. Update the `initialState: TicketsState` to match the updated `TicketsState` interface.
2. Update the `ticketsReducer` function
3. Update `on(allTicketsLoaded...)` to build the entities and ids values appropriately
   > Use `tickets.reduce(()={},{...state.entities})` to build a new **entities** TicketDictionary instance.
4. Update `on(ticketLoaded...)` to simply add the ticket to the **TicketDictionary**

##### In `tickets.selectors.ts`

1. Create a `getEntities` selector.
2. Create a `getIds` selector.
3. Update the `getAllTickets` and `getSelectedTicket` selectors to use the new getEntities and getIds selectors.
4. export all the selectors as part of a namespace using `export namespace ticketsQuery { ... }`

<br/>

### Code Snippets

###### `tickets.interfaces.ts`

```ts
export interface TicketsState {
  entities: { [key: number]: Ticket };
  ids: number[];
  selectedId: number;
  loading: boolean;
  error: any;
}
```

###### `tickets.reducer.ts`

```ts
export const initialState: TicketsState = {
  entities: {},
  ids: [],
  selectedId: -1,
  loading: false,
  error: ''
};

const reducer = createReducer(
  initialState,
  on(allTicketsLoaded, (state, { tickets }) => ({
    ...state,
    entities: tickets.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
    ids: tickets.map(ticket => ticket.id)
  })),
  on(ticketLoaded, (state, { ticket }) => ({
    ...state,
    entities: {
      ...state.entities,
      [ticket.id]: ticket
    },
    ids: state.ids.some(id => ticket.id === id)
      ? state.ids
      : [...state.ids, ticket.id]
  }))
);

export function ticketsReducer(
  state: TicketsState | undefined,
  action: Action
): TicketsState {
  return reducer(state, action);
}
```

###### `tickets.selectors.ts`

```ts
export namespace ticketsQuery {
  const selectTicketState = createFeatureSelector<TicketsState>(
    FEATURE_TICKETS
  );
  export const getIsLoading = createSelector(
    selectTicketState,
    state => state.loading
  );
  export const getError = createSelector(
    selectTicketState,
    state => state.error
  );
  export const getSelectedId = createSelector(
    selectTicketState,
    state => state.selectedId
  );
  export const getAllTickets = createSelector(
    selectTicketState,
    state => state.ids.map(id => state.entities[id])
  );
  export const getEntities = createSelector(
    selectTicketState,
    state => state.entities
  );
  export const getIds = createSelector(
    selectTicketState,
    state => state.ids
  );
  export const getSelectedTicket = createSelector(
    selectTicketState,
    state => state.entities[state.selectedId]
  );
}
```

<br/>

---

<br/>

### Investigate

The selectors and reducer have become slightly more complex... but this initial complexity is only an aspect of an manual simulation of @ngrx/entity.

Consider these questions:

- Why did we use a `namespace ticketsQuery`?
- Why did we add selected ticket features like `selectedId` and `getSelectedTicket`?

Be prepared to discuss this?

<br/>

### Running the Application

- Open the **Customer Portal** application with the browser: http://localhost:4203
- Confirm the **Node Server** is running with browser page: http://localhost:3000/api/tickets

Run the following command(s) in individual terminals:

```console
yarn server
```

```console
yarn customer-portal -- -o
```

> If you already have one(s) running and need to restart, you can stop the run with `ctrl+c`.

<br/>

---

<br/>

### Next Lab

Go to NgRx Lab #5: [Use @ngrx/entity](lab-5.md)
