import * as request from 'supertest';
import * as app from './server-app';

import { TICKETS, Ticket } from './data/tickets';
import { USERS, User } from './data/users';
import { COMMENTS, Comment } from './data/comments';
import { EVENTLOGS } from './data/event-logs';
import { COMPANIES } from './data/companies';
import * as Query from './queries';

describe('REST APIs', () => {
  it('should provide valid response for empty urls', async () => {
    return await request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('<a href="http://localhost:3000/api/tickets">');
      });
  });

  describe('with getAll APIs', () => {
    it('should return list of all users', async () => {
      return await request(app)
        .get('/api/users')
        .then(response => {
          expect(response.body.length).toBe(USERS.length);
        });
    });

    it('should return list of all tickets', async () => {
      return await request(app)
        .get('/api/tickets')
        .then(response => {
          expect(response.body.length).toBe(TICKETS.length);
        });
    });

    it('should return list of all companies', async () => {
      return await request(app)
        .get('/api/companies')
        .then(response => {
          expect(response.body.length).toBe(COMPANIES.length);
        });
    });

    it('should return list of all comments', async () => {
      return await request(app)
        .get('/api/comments')
        .then(response => {
          expect(response.body.length).toBe(COMMENTS.length);
        });
    });

    it('should return list of all event logs', async () => {
      return await request(app)
        .get('/api/eventlogs')
        .then(response => {
          expect(response.body.length).toBe(EVENTLOGS.length);
        });
    });
  });

  describe('test search APIs', () => {
    it('should return list of matching users', async () => {
      return await request(app)
        .get('/api/users?searchTerm=je')
        .then(response => {
          const expected = USERS.filter(Query.byPartialFullName('je'))[0];
          const found = response.body[0];

          expect(found.fullName).toBe(expected.fullName);
        });
    });

    it('should return list of tickets by fullName matches', () => {
      return request(app)
        .get('/api/tickets?assignedToUser=Jeff%20Nrwl')
        .then(response => {
          const assignedTo: User = USERS.filter(Query.byFullName('Jeff Nrwl'))[0];
          const tickets = TICKETS.filter(it => it.assignedToUserId == assignedTo.id);

          expect(response.body.length).toEqual(tickets.length);
        });
    });
  });
});
