import { Ticket } from '@tuskdesk-suite/data-models';

export interface TicketsStateModel {
  tickets: Ticket[];
}

export interface TicketsStateModelState {
  readonly ticketsStateModel: TicketsStateModel;
}
