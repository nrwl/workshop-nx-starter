import { USERS } from './data/users';

// *********************************
// Filters
// *********************************

export function isSubmittedBy(who) {
  return ticket => (!who || who.isAgent ? true : ticket.submittedByUserId === who.id);
}
export function isAssignedTo(who) {
  return ticket => (!who ? true : ticket.assignedToUserId === who.id);
}
export function byFullName(who) {
  return user => user.fullName.toLowerCase() === who.toLowerCase();
}
export function byPartialFullName(criteria) {
  return user => user.fullName.toLowerCase().indexOf(criteria.toLowerCase()) > -1;
}
export function ticketByMessage(criteria: string) {
  return ticket => {
    const message = ticket.message.toLowerCase();
    return !!criteria ? message.indexOf(criteria.toLowerCase()) >= 0 : true;
  };
}
export function ticketByStatus(value) {
  return ticket => (!!value ? ticket.status === value : true);
}

// *********************************
// Request Parameters
// *********************************

export function getRequestParams(req) {
  let currentUser = getCurrentUser(req);
  return {
    currentUser,
    status: getStatus(req),
    searchTerm: getSearchTerm(req),
    assignedToUser: getAssignedToUser(req),
    isAgent: currentUser ? getCurrentUser(req).isAgent : false,
    queryId: +req.params.id,
    body: req.body
  };
}

function getCurrentUser(req) {
  const userId = +req.header('userid');
  return USERS.find(user => user.id === userId);
}

function getStatus(req) {
  return req.query['status'] !== 'undefined' ? req.query['status'] : null;
}
function getSearchTerm(req) {
  return req.query['searchTerm'] !== 'undefined' ? req.query['searchTerm'] : null;
}

function getAssignedToUser(req) {
  return req.query['assignedToUser'] !== 'undefined' ? req.query['assignedToUser'] : null;
}
