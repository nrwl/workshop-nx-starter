import { User } from '@tuskdesk-suite/shared/user-utils';

export interface TicketRequest {
  currentUser: User;
  status: string;
  searchTerm: string;
  assignedToUser: string;
  isAgent: boolean;
  queryId: number;
  body: any;
}
