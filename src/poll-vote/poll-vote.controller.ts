import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { PollVoteService } from './poll-vote.service';

@Controller('poll')
export class PollVoteController {
  constructor(private PollVoteService: PollVoteService) {}

  @Post('vote')
  async votePoll(@Body() req: { activityUiid: string; userEmail: string; attendanceDates: number[] }): Promise<void> {
    return await this.PollVoteService.vote(req.activityUiid, req.userEmail, req.attendanceDates);
  }

  @Get('get-poll-votes-count')
  async getPollVotesCountByActivityId(@Query('id') activityUiid: string) {
    return await this.PollVoteService.getPollVotesCountByActivityId(activityUiid);
  }

  @Get('get-poll-participants')
  async getPollParticipantsByActivityId(@Query('id') activityUiid: string) {
    return await this.PollVoteService.getPollParticipantsByActivityId(activityUiid);
  }
}
