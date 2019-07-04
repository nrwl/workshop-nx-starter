import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../api/src/app/app.module';
import * as request from 'supertest';
import {
  EXPECTED_ALL_TICKETS,
  EXPECTED_SINGLE_TICKET,
  EXPECTED_SINGLE_TICKET_COMMENTS,
  EXPECTED_ALL_EVENT_LOGS,
  EXPECTED_ALL_COMMENTS,
  EXPECTED_ALL_COMPANIES,
  EXPECTED_SINGLE_COMPANY
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

  it('/GET ticket comments at id', () => {
    return request(app.getHttpServer())
      .get('/tickets/1/comments')
      .expect(200)
      .expect(EXPECTED_SINGLE_TICKET_COMMENTS);
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
});
