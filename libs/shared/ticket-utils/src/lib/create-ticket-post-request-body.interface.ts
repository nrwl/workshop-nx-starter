export interface CreateTicketPostRequestBody {
  message: string;
  companyId: number;
  submittedByUserId: number;
  assignedToUserId?: number | null;
}
