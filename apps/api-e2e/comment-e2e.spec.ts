import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../api/src/app/app.module';
import {
  EVENTLOG_AFTER_VIEWING_COMMENTS,
  EXPECTED_ALL_COMMENTS,
  EXPECTED_COMMENTS_AFTER_CREATE,
  EVENTLOG_AFTER_CREATE_COMMENT
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

  describe('GET comments', () => {
    it('sunnyday', () => {
      return request(app.getHttpServer())
        .get('/comments')
        .set({ userId: 10 })
        .expect(200)
        .expect(EXPECTED_ALL_COMMENTS)
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .expect(200)
            .expect(EVENTLOG_AFTER_VIEWING_COMMENTS)
        );
    });
  });

  describe('POST comment', () => {
    it('sunnyday', () => {
      const update = { message: 'test', ticketId: 1 };
      return request(app.getHttpServer())
        .post('/comments')
        .set({ userid: 10 })
        .send(update)
        .expect(201)
        .expect({
          id: 4,
          message: 'test',
          ticketId: 1,
          userId: 10,
          userFullName: 'Zack Nrwl'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/comments')
            .set({ userid: 10 })
            .expect(200)
            .expect(EXPECTED_COMMENTS_AFTER_CREATE)
        )
        .then(() =>
          request(app.getHttpServer())
            .get('/event-logs')
            .set({ userid: 10 })
            .expect(200)
            .expect(EVENTLOG_AFTER_CREATE_COMMENT)
        );
    });

    it('bad user id', () => {
      const comment = { message: 'test', ticketId: 1 };
      return request(app.getHttpServer())
        .post('/comments')
        .set({ userid: 10000 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No user exists at id: 10000'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/comments')
            .expect(200)
            .expect(EXPECTED_ALL_COMMENTS)
        );
    });

    it('bad user ticketId', () => {
      const comment = { message: 'test', ticketId: 100 };
      return request(app.getHttpServer())
        .post('/comments')
        .set({ userid: 10 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'No ticket exists at id: 100'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/comments')
            .expect(200)
            .expect(EXPECTED_ALL_COMMENTS)
        );
    });

    it('missing ticketId', () => {
      const comment = { message: 'test' };
      return request(app.getHttpServer())
        .post('/comments')
        .set({ userid: 10 })
        .send(comment)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Invalid request body'
        })
        .then(() =>
          request(app.getHttpServer())
            .get('/comments')
            .expect(200)
            .expect(EXPECTED_ALL_COMMENTS)
        );
    });
  });
});
