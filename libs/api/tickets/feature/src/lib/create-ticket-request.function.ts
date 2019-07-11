import { Request } from 'express';
import { TicketRequest } from './ticket-request.interface';
import { User } from '@tuskdesk-suite/shared/user-utils';

export const createTicketRequestFromRequest = (
  req: Request,
  users: User[]
): TicketRequest => {
  const currentUser = users.find(user => +req.header('userid') === user.id);
  return {
    currentUser,
    status: req.query['status'] !== 'undefined' ? req.query['status'] : null,
    searchTerm:
      req.query['searchTerm'] !== 'undefined' ? req.query['searchTerm'] : null,
    assignedToUser:
      req.query['assignedToUser'] !== 'undefined'
        ? req.query['assignedToUser']
        : null,
    isAgent: currentUser ? currentUser.isAgent : false,
    queryId: req.params && req.params.id ? +req.params.id : null,
    body: req.body
  };
};
