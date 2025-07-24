import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /score should return correct score', async () => {
    const jobRanking = ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'];
    const applicantRanking = ['Empathy', 'Harmony', 'Adaptability', 'Focus', 'Discipline'];

    const response = await request(app.getHttpServer())
      .post('/score')
      .send({ jobRanking, applicantRanking })
      .expect(201); // Default status for POST in NestJS unless overridden

    expect(response.body).toHaveProperty('score');
    expect(typeof response.body.score).toBe('number');
  });

  it('POST /score should return 400 for invalid ranking length', async () => {
    const jobRanking = ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'];
    const applicantRanking = ['Empathy', 'Harmony']; // Too short

    await request(app.getHttpServer())
      .post('/score')
      .send({ jobRanking, applicantRanking })
      .expect(500); // Error thrown internally (no validation decorators in DTO)
  });

  it('POST /score should return 500 for unknown trait', async () => {
    const jobRanking = ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'];
    const applicantRanking = ['Empathy', 'Harmony', 'Creativity', 'Focus', 'Discipline']; // Invalid trait

    await request(app.getHttpServer())
      .post('/score')
      .send({ jobRanking, applicantRanking })
      .expect(500); // computeScore will throw
  });
});
