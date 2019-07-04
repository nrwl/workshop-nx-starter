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
  EXPECTED_SINGLE_TICKET_COMMENTS
} from './test-constants';

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
});
