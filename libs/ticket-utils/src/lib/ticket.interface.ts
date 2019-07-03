export interface Ticket {
  id: number;
  message: string;
  status: string;
  companyId: number;
  submittedByUserId: number;
  assignedToUserId: number;
  assignedToUserFullName: string;
}
