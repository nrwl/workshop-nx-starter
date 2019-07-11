import { TicketStatus } from './ticket-status.type';

export interface Ticket {
  id: number;
  message: string;
  status: TicketStatus;
  companyId: number;
  submittedByUserId: number;
  assignedToUserId: number;
  assignedToUserFullName: string;
}
