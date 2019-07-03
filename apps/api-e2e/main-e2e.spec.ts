import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../api/src/app/app.module';
import * as request from 'supertest';
import { EXPECTED_ALL_TICKETS, EXPECTED_SINGLE_TICKET } from './test-constants';

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
});
