import { User } from '@tuskdesk-suite/user-utils';

export interface TicketRequest {
  currentUser: User;
  status: string;
  searchTerm: string;
  assignedToUser: boolean;
  isAgent: boolean;
  queryId: number;
  body: any;
}
