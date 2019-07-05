import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../api/src/app/app.module';
import {
  EXPECTED_ALL_EVENT_LOGS,
  EVENTLOG_AFTER_VIEWING_EVENTLOG
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

  describe('GET event log', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/event-logs')
        .set({ userid: 10 })
        .expect(200)
        .expect(EXPECTED_ALL_EVENT_LOGS)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_VIEWING_EVENTLOG)
        );
    });
  });
});
