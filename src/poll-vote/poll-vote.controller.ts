import { Body, Controller, Get, Post, Param, Query, Patch } from '@nestjs/common';
import { PollVoteService } from './poll-vote.service';

@Controller('poll')
export class PollVoteController {
  constructor(private pollVoteService: PollVoteService) {}

  @Post('vote')
  async votePoll(@Body() req: { activityUiid: string; userEmail: string; attendanceDates: number[] }): Promise<void> {
    return await this.pollVoteService.vote(req.activityUiid, req.userEmail, req.attendanceDates);
  }

  @Get('get-votes-count')
  async getPollVotesCountByActivityId(@Query('id') activityUiid: string) {
    return await this.pollVoteService.getPollVotesCountByActivityId(activityUiid);
  }

  @Get('get-participants') // TODO: Change to "get-participant-by-vote" and move generic "get-participants" to ActivityParticipantController
  async getPollParticipantsByActivityId(@Query('id') activityUiid: string) {
    return await this.pollVoteService.getPollParticipantsByActivityId(activityUiid);
  }

  // TODO: Close poll (select final date, update activity and send calendar)
  // @Patch('close')
  // async closePoll(@Body() req: { selectedDate: number }) {
  //   return await this.pollVoteService.closePoll(req.selectedDate);
  // }

  // TODO: Update poll votes

  // TODO: Delete poll votes (user leaves activity)
}
