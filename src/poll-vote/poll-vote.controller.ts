import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { PollVoteService } from './poll-vote.service';

@Controller('poll')
export class PollVoteController {
  constructor(private PollVoteService: PollVoteService) {}

  @Post('vote')
  async votePoll(@Body() req: { activityUiid: string; userEmail: string; attendanceDates: number[] }): Promise<void> {
    return await this.PollVoteService.vote(req.activityUiid, req.userEmail, req.attendanceDates);
  }

  @Get('get-votes-count')
  async getPollVotesCountByActivityId(@Query('id') activityUiid: string) {
    return await this.PollVoteService.getPollVotesCountByActivityId(activityUiid);
  }

  @Get('get-participants') // TODO: Change to "get-participant-by-vote" and move generic "get-participants" to ActivityParticipantController
  async getPollParticipantsByActivityId(@Query('id') activityUiid: string) {
    return await this.PollVoteService.getPollParticipantsByActivityId(activityUiid);
  }

  // TODO: Close poll (select final date, update activity and send calendar)

  // TODO: Update poll votes

  // TODO: Delete poll votes (user leaves activity)
}
