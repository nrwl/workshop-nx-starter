import { TicketStatus } from './ticket-status.type';

export interface UpdateTicketPostRequestBody {
  id: number;
  message?: string;
  status?: TicketStatus;
  assignedToUserId?: number | null;
}
