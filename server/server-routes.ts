import { TICKETS, Ticket } from './data/tickets';
import { USERS, User } from './data/users';
import { COMMENTS, Comment } from './data/comments';
import { EVENTLOGS } from './data/event-logs';
import { COMPANIES } from './data/companies';

import * as Query from './queries';

const fs = require('fs');
const path = require('path');
const SERVER_API_HTML = './server-help.html';

/**
 * Register the GET & POST handlers with
 * the Express server
 */
export function registerAppRoutes(app, useThrottle) {
  const routes = loadAppRoutes(useThrottle);

  for (let key in routes.GET) {
    app.get(key, routes.GET[key]);
  }

  for (let key in routes.POST) {
    app.post(key, routes.POST[key]);
  }
}
/**
 * Return collection of endpoints (routes) + handlers for
 * GET and POST HTTP requests
 */
export function loadAppRoutes(enableDelays = true) {
  const randomDelay = () => (enableDelays ? Math.random() * 4000 : 0);
  const delayResponse = fn => setTimeout(fn, randomDelay());

  return {
    GET: {
      '/': (req, res) => {
        let file = require.resolve(path.join(__dirname, SERVER_API_HTML));
        res.send(fs.readFileSync(file).toString());
      },
      '/api/tickets': (req, res) => {
        const {
          currentUser,
          status,
          searchTerm,
          assignedToUser
        } = Query.getRequestParams(req);

        delayResponse(() => {
          const who = assignedToUser
            ? USERS.find(Query.byFullName(assignedToUser))
            : null;
          let ticketsToReturn = TICKETS.filter(Query.isSubmittedBy(currentUser))
            .filter(Query.isAssignedTo(who))
            .filter(Query.ticketByMessage(searchTerm))
            .filter(Query.ticketByStatus(status));

          res.send(ticketsToReturn);
          return trackEvent(req, '/api/tickets', 'getAllTickets()');
        });
      },
      '/api/eventlogs': (req, res) => {
        delayResponse(() => {
          trackEvent(req, '/api/eventlogs', 'getAllEvents()');
          return res.send(EVENTLOGS);
        });
      },
      '/api/comments': (req, res) => {
        delayResponse(() => {
          res.send(COMMENTS);
          return trackEvent(req, '/api/comments', 'getAllComments()');
        });
      },
      '/api/companies': (req, res) => {
        const { isAgent, currentUser } = Query.getRequestParams(req);
        delayResponse(() => {
          res.send(COMPANIES);
          return trackEvent(req, '/api/companies', 'getAllCompanies()');
        });
      },
      '/api/companies/:id': (req, res) => {
        const { queryId } = Query.getRequestParams(req);
        delayResponse(() => {
          const matching = COMPANIES.filter(t => t.id === queryId)[0];
          if (matching) {
            res.send(matching);
            return trackEvent(
              req,
              `/api/companies/${queryId}`,
              'getCompanyById()'
            );
          } else {
            announceError(
              res,
              `/api/companies/${queryId}`,
              404,
              `Cannot find company ${queryId}`
            );
          }
        });
      },
      '/api/companies/:id/users': (req, res) => {
        const { queryId } = Query.getRequestParams(req);
        delayResponse(() => {
          const matchingCompanies = COMPANIES.filter(t => t.id === queryId)[0];
          const findUserByID = userId => USERS.find(user => user.id === userId);

          if (matchingCompanies) {
            res.send(matchingCompanies.userIds.map(findUserByID));
            return trackEvent(
              req,
              `/api/companies/${queryId}/users`,
              'getUsersForCompany()'
            );
          } else {
            announceError(
              res,
              `/api/companies/${queryId}/users`,
              404,
              `Cannot find company ${queryId}`
            );
          }
        });
      },
      '/api/tickets/:id': (req, res) => {
        const { queryId } = Query.getRequestParams(req);
        delayResponse(() => {
          const matching = TICKETS.filter(t => t.id === queryId)[0];
          if (matching) {
            res.send(matching);
            return trackEvent(
              req,
              `/api/tickets/${queryId}`,
              'getTicketById()'
            );
          } else {
            res
              .status(404)
              .send({ error: `Cannot find ticket ${+req.params.id}` });
          }
        });
      },
      '/api/tickets/:id/comments': (req, res) => {
        const { queryId } = Query.getRequestParams(req);
        delayResponse(() => {
          const matching = COMMENTS.filter(t => t.ticketId === queryId);
          if (matching) {
            res.send(matching);
            return trackEvent(
              req,
              `/api/tickets/${queryId}/comments`,
              'getCommentsForTicket()'
            );
          } else {
            announceError(
              res,
              `/api/tickets/${queryId}/comments`,
              404,
              `comments not available`
            );
          }
        });
      },
      '/api/users': (req, res) => {
        const { searchTerm } = Query.getRequestParams(req);

        delayResponse(() => {
          res.send(
            searchTerm
              ? USERS.filter(Query.byPartialFullName(searchTerm))
              : USERS
          );
          return trackEvent(req, '/api/users', 'getAllUsers()');
        });
      },
      '/api/users/:id': (req, res) => {
        const { queryId } = Query.getRequestParams(req);

        delayResponse(() => {
          const matching = USERS.filter(t => t.id === queryId);
          if (matching) {
            res.send(matching);
            return trackEvent(req, `/api/users/${queryId}`, 'getUserById()');
          } else {
            announceError(res, '/api/users/:id', 404, `user not found`);
          }
        });
      }
    },
    POST: {
      '/api/tickets': (req, res) => {
        delayResponse(function() {
          const { body } = Query.getRequestParams(req);
          if (body.message) {
            const existingTicket = TICKETS.find(
              ticket => ticket.id === body.id
            );
            res.send({ ...existingTicket, message: body.message });
            return trackEvent(req, '/api/tickets', 'POST update');
          } else {
            announceError(
              res,
              'POST /api/tickets',
              500,
              `'message' is a required field`
            );
          }
        });
      },
      '/api/comments': (req, res) => {
        delayResponse(function() {
          const { currentUser, body } = Query.getRequestParams(req);
          if (body.message) {
            const newComment: Comment = {
              id: ++lastCommentId,
              message: body.message,
              ticketId: body.ticketId,
              userId: currentUser ? currentUser.id : 0,
              userFullName: currentUser ? currentUser.fullName : 'anonymous'
            };
            COMMENTS.push(newComment);
            res.send(newComment);
            return trackEvent(req, '/api/comments', 'POST update');
          } else {
            announceError(
              res,
              'POST /api/comments',
              500,
              `'message' is a required field`
            );
          }
        });
      },
      '/api/assign': (req, res) => {
        delayResponse(function() {
          const { body } = Query.getRequestParams(req);
          const ticketId = body.ticketId;
          const assignToUserId = body.assignToUserId;
          const matchingTicket = TICKETS.filter(t => t.id === ticketId)[0];
          const matchingUser = USERS.filter(u => u.id === assignToUserId)[0];

          if (!matchingTicket) {
            announceError(
              res,
              'POST /api/assign',
              404,
              `Cannot find ticket ${ticketId}`
            );
          } else if (!matchingUser) {
            announceError(
              res,
              'POST /api/assign',
              404,
              `Cannot find user ${assignToUserId}`
            );
          } else {
            matchingTicket.assignedToUserId = assignToUserId;
            res.send(matchingTicket);
            return trackEvent(req, '/api/assign', 'POST update');
          }
        });
      },
      '/api/complete': (req, res) => {
        delayResponse(function() {
          const { body } = Query.getRequestParams(req);
          const ticketId = body.ticketId;
          const matchingTicket = TICKETS.filter(t => t.id === ticketId)[0];

          if (matchingTicket) {
            matchingTicket.status = 'completed';
            res.send(matchingTicket);
            return trackEvent(req, '/api/complete', 'POST update');
          } else {
            announceError(
              res,
              'POST /api/assign',
              404,
              `Cannot find ticket ${ticketId}`
            );
          }
        });
      }
    }
  };
}

let lastEventLogId = EVENTLOGS.length;
let lastCommentId = COMMENTS.length;

function announceError(res, context, code = 401, message = 'not authorized') {
  res.status(code).send({ error: `${context} ${message}` });
  addEventLog(null, `${code}: ${message}`, context);
}

function trackEvent(req, context, intent = 'viewed') {
  const { currentUser } = Query.getRequestParams(req);
  addEventLog(currentUser ? currentUser.id : '', intent, context);
}

function addEventLog(userId, message, resourceType, resourceId = null) {
  EVENTLOGS.push({
    id: ++lastEventLogId,
    message,
    resourceType,
    userId,
    resourceId
  });
}
