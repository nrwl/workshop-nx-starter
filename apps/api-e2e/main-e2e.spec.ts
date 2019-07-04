import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../api/src/app/app.module';
import {
  EXPECTED_ALL_COMMENTS,
  EXPECTED_ALL_COMPANIES,
  EXPECTED_ALL_EVENT_LOGS,
  EXPECTED_ALL_TICKETS,
  EXPECTED_SINGLE_COMPANY,
  EXPECTED_SINGLE_COMPANY_USERS,
  EXPECTED_SINGLE_TICKET,
  EXPECTED_SINGLE_TICKET_COMMENTS,
  EXPECTED_USERS,
  EXPECTED_USERS_WITH_SEARCH_TERM,
  EXPECTED_SINGLE_USER,
  EXPECTED_CREATE_TICKET,
  EXPECTED_UPDATED_TICKETS
} from './test-constants';
import { resolve } from 'url';

describe('api', () => {
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

  it('/GET tickets', () => {
    return request(app.getHttpServer())
      .get('/tickets')
      .expect(200)
      .expect(EXPECTED_ALL_TICKETS);
  });

  it('/GET ticket at id', () => {
    return request(app.getHttpServer())
      .get('/tickets/1')
      .expect(200)
      .expect(EXPECTED_SINGLE_TICKET);
  });

  it('/GET tickets at invalid id', () => {
    return request(app.getHttpServer())
      .get('/tickets/9999')
      .expect(400);
  });

  it('/GET ticket comments at id', () => {
    return request(app.getHttpServer())
      .get('/tickets/1/comments')
      .expect(200)
      .expect(EXPECTED_SINGLE_TICKET_COMMENTS);
  });

  it('/GET ticket comments at invalid id', () => {
    return request(app.getHttpServer())
      .get('/tickets/4000/comments')
      .expect(400);
  });

  it('/GET event logs', () => {
    return request(app.getHttpServer())
      .get('/event-logs')
      .expect(200)
      .expect(EXPECTED_ALL_EVENT_LOGS);
  });

  it('/GET comments', () => {
    return request(app.getHttpServer())
      .get('/comments')
      .expect(200)
      .expect(EXPECTED_ALL_COMMENTS);
  });

  it('/GET companies', () => {
    return request(app.getHttpServer())
      .get('/companies')
      .expect(200)
      .expect(EXPECTED_ALL_COMPANIES);
  });

  it('/GET companies at id', () => {
    return request(app.getHttpServer())
      .get('/companies/1')
      .expect(200)
      .expect(EXPECTED_SINGLE_COMPANY);
  });

  it('/GET company at invalid company id', () => {
    return request(app.getHttpServer())
      .get('/companies/10')
      .expect(400);
  });

  it('/GET users at company id', () => {
    return request(app.getHttpServer())
      .get('/companies/1/users')
      .expect(200)
      .expect(EXPECTED_SINGLE_COMPANY_USERS);
  });

  it('/GET users at invalid company id', () => {
    return request(app.getHttpServer())
      .get('/companies/10/users')
      .expect(400);
  });

  it('/GET users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(EXPECTED_USERS);
  });

  it('/GET users with search term', () => {
    return request(app.getHttpServer())
      .get('/users?searchTerm=zac')
      .expect(200)
      .expect(EXPECTED_USERS_WITH_SEARCH_TERM);
  });

  it('/GET users at id', () => {
    return request(app.getHttpServer())
      .get('/users/10')
      .expect(200)
      .expect(EXPECTED_SINGLE_USER);
  });

  it('/GET users at invalid id', () => {
    return request(app.getHttpServer())
      .get('/users/4000')
      .expect(400);
  });

  it('/POST to create new ticket', () => {
    const ticket = { message: 'test', companyId: 1, submittedByUserId: 1 };
    return request(app.getHttpServer())
      .post('/tickets')
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
      .then(res =>
        request(app.getHttpServer())
          .get('/tickets')
          .expect(200)
          .expect(EXPECTED_CREATE_TICKET)
      );
  });

  it('/POST to update exisiting ticket', () => {
    const update = { id: 7, assignedToUserId: 10, status: 'closed' };
    return request(app.getHttpServer())
      .post('/tickets')
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
          .expect(200)
          .expect(EXPECTED_UPDATED_TICKETS)
      );
  });

  it('/POST to ticket with malformed body', () => {
    const body = { foo: 'foo' };
    return request(app.getHttpServer())
      .post('/tickets')
      .send(body)
      .expect(400);
  });

  it('/POST ticket with create body; bad reporting user id', () => {
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

  it('/POST ticket with create body; bad company id', () => {
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

  it('/POST ticket with create body; bad assigned user id', () => {
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

  it('/POST ticket update; bad ticket id', () => {
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

  it('/POST ticket update; bad assigneduser id', () => {
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
