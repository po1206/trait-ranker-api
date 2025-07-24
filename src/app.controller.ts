import { Controller, Post, Body } from '@nestjs/common';
import { computeScore } from './dto/score.util';
import { ScoreDto } from './dto/score.dto';

@Controller()
export class AppController {

  @Post('score')
  getScore(@Body() body: ScoreDto) {
    const {jobRanking, applicantRanking} = body;
    const score = computeScore(jobRanking, applicantRanking);
    return {score};
  }
}
