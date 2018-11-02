export interface Ticket {
  id: number;
  message: string;
  status: string;
  companyId: number;
  submittedByUserId: number;
  assignedToUserId: number;
  assignedToUserFullName: string;
}

export interface TicketComment {
  id: number;
  message: string;
  ticketId: number;
  userId: number;
  userFullName: string;
}

export interface Company {
  id: string;
  name: string;
  userIds: number[];
}

export interface User {
  id: string;
  username: string;
  fullName: string;
}

export interface EventLog {
  id: number;
  message: string;
  userId: number;
  resourceType: string;
  resourceId: number;
}
