import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('create')
  //@UseGuards(JwtAuthGuard)
  async createActivity(@Body() req: Activity.CreateDto) {
    return await this.activityService.createOne(req);
  }

  @Patch('update')
  //@UseGuards(JwtAuthGuard)
  async updateActivity(@Body() req: any) {
    //TODO: Fix type --> UpdateDto excluding pollOptions
    const { uuid, ...updateValues } = req;
    await this.activityService.updateOne(uuid, updateValues);
  }

  @Get('get-owned-activities/:id')
  //@UseGuards(JwtAuthGuard)
  async getAllOwnedActivitiesByUserId(@Param('id') id: number) {
    return await this.activityService.getAllOwnedActivitiesByUserId(+id);
  }

  @Get('get-activity-poll-options')
  //@UseGuards(JwtAuthGuard)
  async getActivityPollOptionsById(@Query('id') uiid: string) {
    return await this.activityService.getPollOptions(uiid);
  }

  @Get(':uuid')
  //@UseGuards(JwtAuthGuard)
  async getActivityById(@Param('uiid') uiid: string) {
    return await this.activityService.findOne(uiid);
  }
}
