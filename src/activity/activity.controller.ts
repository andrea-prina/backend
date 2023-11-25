import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.model';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('create')
  async createActivity(@Body() req: Activity.CreateDto) {
    return await this.activityService.createOne(req);
  }

  @Patch('update')
  async updateActivity(@Body() req: any) {
    //TODO: Fix type --> UpdateDto
    const { uuid, ...updateValues } = req;
    const updateOutcome: 'UPDATED' | 'ERROR' = await this.activityService.updateOne(uuid, updateValues);
    return updateOutcome;
  }

  @Get(':id')
  async getAllActivitiesByUserId(@Param('id') id: number) {
    return await this.activityService.getAllActivitiesByUserId(+id);
  }
}
