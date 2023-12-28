import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';

@Controller('user-activity')
export class UserActivityController {
  constructor(private userActivityService: UserActivityService) {}

  @Post('vote')
  async votePoll(@Body() req: { activityUiid: string; userEmail: string; attendanceDates: number[] }): Promise<void> {
    return await this.userActivityService.vote(req.activityUiid, req.userEmail, req.attendanceDates);
  }

  @Get('get-poll-votes-count')
  async getPollVotesCountByActivityId(@Query('id') activityUiid: string) {
    return await this.userActivityService.getPollVotesCountByActivityId(activityUiid);
  }

  @Get('get-poll-participants')
  async getPollParticipantsByActivityId(@Query('id') activityUiid: string) {
    return await this.userActivityService.getPollParticipantsByActivityId(activityUiid);
  }
}
