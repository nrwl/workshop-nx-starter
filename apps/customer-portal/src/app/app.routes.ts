export const APP_ROUTES = [
  {
    path: '',
    loadChildren: () =>
      import('../../../../libs/ticket-list-view/src/lib/ticket-list-view.module').then(
        m => m.TicketListViewModule
      )
  }
];
