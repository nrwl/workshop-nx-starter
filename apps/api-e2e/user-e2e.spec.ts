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
  EVENTLOG_AFTER_VIEWING_COMPANY_USERS,
  EXPECTED_USERS,
  EVENTLOG_AFTER_VIEWING_USERS,
  EXPECTED_USERS_WITH_SEARCH_TERM,
  EVENTLOG_AFTER_USER_WITH_SEARCH_TERM,
  EXPECTED_SINGLE_USER,
  EVENTLOG_AFTER_USER_WITH_ID
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

  describe('GET users', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_USERS)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_VIEWING_USERS)
        );
    });

    it('with searchTerm', () => {
      return request(app.getHttpServer())
        .get('/users?searchTerm=zac')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_USERS_WITH_SEARCH_TERM)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_USER_WITH_SEARCH_TERM)
        );
    });
  });

  describe('GET user at id', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/users/10')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_SINGLE_USER)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_USER_WITH_ID)
        );
    });
  });

  it('invalid id', () => {
    return request(app.getHttpServer())
      .get('/users/4000')
      .expect(400);
  });
});
