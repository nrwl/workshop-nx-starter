import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../api/src/app/app.module';
import {
  EXPECTED_ALL_TICKETS,
  EVENTLOG_AFTER_VIEWING_TICKETS,
  EXPECTED_SINGLE_TICKET_COMMENTS,
  EVENT_LOG_AFTER_VIEWING_COMMENTS_FOR_TICKETS,
  EXPECTED_CREATE_TICKET,
  EVENTLOG_AFTER_CREATE_TICKET,
  EXPECTED_UPDATED_TICKETS,
  EVENTLOG_AFTER_UPDATE_TICKET,
  EXPECTED_TICKETS_AFTER_ASSIGN,
  EVENT_LOG_AFTER_ASSIGN,
  EXPECTED_TICKETS_AFTER_COMPLETE,
  EVENT_LOG_AFTER_COMPLETE
} from './test-constants';

describe('tickets', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET tickets', () => {
    it('sunny day', () => {
      return request(app.getHttpServer())
        .get('/tickets')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_ALL_TICKETS)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_VIEWING_TICKETS)
        );
    });
  });

  describe('GET ticket at id', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/tickets/1/comments')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_SINGLE_TICKET_COMMENTS)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENT_LOG_AFTER_VIEWING_COMMENTS_FOR_TICKETS)
        );
    });

    it('bad ticket id', () => {
      return request(app.getHttpServer())
        .get('/tickets/9999')
        .expect(400);
    });
  });

  describe('GET ticket comments', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/tickets/1/comments')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_SINGLE_TICKET_COMMENTS)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENT_LOG_AFTER_VIEWING_COMMENTS_FOR_TICKETS)
        );
    });

    it('invalid ticket id', () => {
      return request(app.getHttpServer())
        .get('/tickets/4000/comments')
        .expect(400);
    });
  });

  describe('POST ticket', () => {
    it('create new ticket', () => {
      const ticket = { message: 'test', companyId: 1, submittedByUserId: 1 };
      return request(app.getHttpServer())
        .post('/tickets')
        .set({ userid: 10 })
        .send(ticket)
        .expect(201)
        .expect({
          id: 8,
          message: ticket.message,
          status: 'open',
          companyId: 1,
          submittedByUserId: 1,
          assignedToUserId: null,
          assignedToUserFullName: null
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .set({ userid: 10 })
            .expect(200)
            .expect(EXPECTED_CREATE_TICKET)
        )
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .set({ userid: 10 })
            .expect(200)
            .expect(EVENTLOG_AFTER_CREATE_TICKET)
        );
    });

    it('update existing ticket', () => {
      const update = { id: 7, assignedToUserId: 10, status: 'closed' };
      return request(app.getHttpServer())
        .post('/tickets')
        .set({ userid: 10 })
        .send(update)
        .expect(201)
        .expect({
          id: 7,
          message: 'Cannot connect to WiFi at our office from my second laptop',
          status: 'closed',
          companyId: 1,
          submittedByUserId: 1,
          assignedToUserId: 10,
          assignedToUserFullName: 'Zack Nrwl'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .set({ userid: 10 })
            .expect(200)
            .expect(EXPECTED_UPDATED_TICKETS)
        )
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .set({ userid: 10 })
            .expect(200)
            .expect(EVENTLOG_AFTER_UPDATE_TICKET)
        );
    });

    it('malformed body', () => {
      const body = { foo: 'foo' };
      return request(app.getHttpServer())
        .post('/tickets')
        .send(body)
        .expect(400);
    });

    it('create with bad reporting user id', () => {
      const ticket = { message: 'test', companyId: 1, submittedByUserId: 111 };
      return request(app.getHttpServer())
        .post('/tickets')
        .send(ticket)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No User found at id: 111.'
        });
    });

    it('create with bad company id', () => {
      const ticket = { message: 'test', companyId: 999, submittedByUserId: 1 };
      return request(app.getHttpServer())
        .post('/tickets')
        .send(ticket)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No Company found at id: 999'
        });
    });

    it('create with bad assigned user id', () => {
      const ticket = {
        message: 'test',
        companyId: 1,
        submittedByUserId: 1,
        assignedToUserId: 999
      };
      return request(app.getHttpServer())
        .post('/tickets')
        .send(ticket)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No User found at id: 999'
        });
    });

    it('update with bad ticket id', () => {
      const update = { id: 9999, assignedToUserId: 10, status: 'closed' };
      return request(app.getHttpServer())
        .post('/tickets')
        .send(update)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No Ticket found at id: 9999'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(200)
            .expect(EXPECTED_ALL_TICKETS)
        );
    });

    it('update with bad assigned user id', () => {
      const update = { id: 7, assignedToUserId: 9999, status: 'closed' };
      return request(app.getHttpServer())
        .post('/tickets')
        .send(update)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No User found at id: 9999'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(200)
            .expect(EXPECTED_ALL_TICKETS)
        );
    });
  });

  describe('POST assign', () => {
    it('sunnyday', () => {
      const update = { ticketId: 1, assignToUserId: 10 };
      return request(app.getHttpServer())
        .post('/assign')
        .set({ userid: 10 })
        .send(update)
        .expect(201)
        .expect({
          id: 1,
          message: 'PC keeps rebooting after startup',
          status: 'open',
          companyId: 1,
          submittedByUserId: 1,
          assignedToUserId: 10,
          assignedToUserFullName: 'Zack Nrwl'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .set({ userid: 10 })
            .expect(200)
            .expect(EXPECTED_TICKETS_AFTER_ASSIGN)
        )
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .set({ userid: 10 })
            .expect(200)
            .expect(EVENT_LOG_AFTER_ASSIGN)
        );
    });

    it('bad user id for submitter', () => {
      const comment = { ticketId: 1, assignToUserId: 10 };
      return request(app.getHttpServer())
        .post('/assign')
        .set({ userid: 10000 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: "Unable to verify requestor's identity."
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(200)
            .expect(EXPECTED_ALL_TICKETS)
        );
    });

    it('bad user id for assignee', () => {
      const comment = { ticketId: 1, assignToUserId: 100 };
      return request(app.getHttpServer())
        .post('/assign')
        .set({ userid: 10 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No user exists at id: 100.'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(EXPECTED_ALL_TICKETS)
            .expect(200)
        );
    });

    it('bad ticket id', () => {
      const comment = { ticketId: 1000, assignToUserId: 10 };
      return request(app.getHttpServer())
        .post('/assign')
        .set({ userid: 10 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No ticket exists at id: 1000.'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(EXPECTED_ALL_TICKETS)
            .expect(200)
        );
    });
  });

  describe('POST complete ticket', () => {
    it('sunnyday', () => {
      const update = { ticketId: 1 };
      return request(app.getHttpServer())
        .post('/complete')
        .set({ userid: 10 })
        .send(update)
        .expect(201)
        .expect({
          id: 1,
          message: 'PC keeps rebooting after startup',
          status: 'completed',
          companyId: 1,
          submittedByUserId: 1,
          assignedToUserId: null,
          assignedToUserFullName: null
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .set({ userid: 10 })
            .expect(200)
            .expect(EXPECTED_TICKETS_AFTER_COMPLETE)
        )
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .set({ userid: 10 })
            .expect(200)
            .expect(EVENT_LOG_AFTER_COMPLETE)
        );
    });

    it('malformed body', () => {
      const comment = { foo: 'foo' };
      return request(app.getHttpServer())
        .post('/complete')
        .set({ userid: 10 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Invalid request body.'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(200)
            .expect(EXPECTED_ALL_TICKETS)
        );
    });

    it('bad user id for submitter', () => {
      const comment = { ticketId: 1 };
      return request(app.getHttpServer())
        .post('/complete')
        .set({ userid: 10000 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: "Could not validate requestor's identity."
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(200)
            .expect(EXPECTED_ALL_TICKETS)
        );
    });

    it('bad ticket id', () => {
      const comment = { ticketId: 1000 };
      return request(app.getHttpServer())
        .post('/complete')
        .set({ userid: 10 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No ticket exists at id: 1000.'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/tickets')
            .expect(200)
            .expect(EXPECTED_ALL_TICKETS)
        );
    });
  });
});
