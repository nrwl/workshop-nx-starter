import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../api/src/app/app.module';
import {
  EVENTLOG_AFTER_VIEWING_COMPANIES,
  EXPECTED_ALL_COMPANIES,
  EXPECTED_SINGLE_COMPANY,
  EVENTLOG_AFTER_VIEWING_ONE_COMPANY,
  EXPECTED_SINGLE_COMPANY_USERS,
  EVENTLOG_AFTER_VIEWING_COMPANY_USERS
} from './test-constants';

describe('event-log', () => {
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

  describe('GET companies', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/companies')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_ALL_COMPANIES)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_VIEWING_COMPANIES)
        );
    });
  });

  describe('GET company at id', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/companies/1')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_SINGLE_COMPANY)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_VIEWING_ONE_COMPANY)
        );
    });

    it('invalid company id', () => {
      return request(app.getHttpServer())
        .get('/companies/10')
        .expect(400);
    });
  });

  describe('GET company users', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/companies/1/users')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_SINGLE_COMPANY_USERS)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_VIEWING_COMPANY_USERS)
        );
    });

    it('invalid company id', () => {
      return request(app.getHttpServer())
        .get('/companies/10/users')
        .expect(400);
    });
  });
});
