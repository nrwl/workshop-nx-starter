export const APP_ROUTES = [
  {
    path: '',
    loadChildren: () => import('@tuskdesk-suite/ticket-list-view').then(m => m.TicketListViewModule)
  }
];
