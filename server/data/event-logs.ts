export interface EventLog {
  id: number;
  message: string;
  userId: number;
  resourceType: string;
  resourceId: number;
}

export const EVENTLOGS: EventLog[] = [
  { id: 1, message: 'viewed open TICKETS', userId: 1, resourceType: 'ticket', resourceId: null },
  { id: 2, message: 'created ticket', userId: 1, resourceType: 'ticket', resourceId: 1 },
  { id: 3, message: 'viewed COMPANIES', userId: 9, resourceType: 'company', resourceId: null },
  { id: 4, message: 'viewed company details', userId: 9, resourceType: 'company', resourceId: 2 },
  { id: 5, message: 'viewed ticket details', userId: 1, resourceType: 'ticket', resourceId: 1 }
];
