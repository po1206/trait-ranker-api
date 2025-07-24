// app.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { computeScore } from './dto/score.util';
import { ScoreDto } from './dto/score.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  it('should return a correct score for valid rankings', () => {
    const jobRanking = ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'];
    const applicantRanking = ['Empathy', 'Harmony', 'Adaptability', 'Focus', 'Discipline'];

    const dto: ScoreDto = { jobRanking, applicantRanking };

    // Compute expected score using the same utility
    const expectedScore = computeScore(jobRanking, applicantRanking);

    const result = appController.getScore(dto);
    expect(result).toEqual({ score: expectedScore });
  });

  it('should throw an error if trait count is incorrect', () => {
    const invalidDto: ScoreDto = {
      jobRanking: ['Empathy', 'Harmony', 'Focus'], // Only 3 traits
      applicantRanking: ['Empathy', 'Harmony', 'Focus', 'Discipline', 'Adaptability']
    };

    expect(() => appController.getScore(invalidDto)).toThrowError('Rankings must contain exactly 5 traits.');
  });

  it('should throw an error if trait name is invalid', () => {
    const invalidDto: ScoreDto = {
      jobRanking: ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'],
      applicantRanking: ['Empathy', 'Harmony', 'INVALID_TRAIT', 'Focus', 'Discipline']
    };

    expect(() => appController.getScore(invalidDto)).toThrowError('Unknown trait: INVALID_TRAIT');
  });
});
