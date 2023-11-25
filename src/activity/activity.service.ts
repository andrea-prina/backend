import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from 'src/database/entities/Activity';
import { Repository } from 'typeorm';
import { Activity } from './activity.model';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activitiesRepository: Repository<ActivityEntity>
  ) {}

  async findOne(uiid: string): Promise<ActivityEntity | null> {
    return this.activitiesRepository.findOneBy({ uiid });
  }

  async createOne(activity: Activity.CreateDto) {
    const newActivity = this.activitiesRepository.create(activity);
    return this.activitiesRepository.save(newActivity);
  }

  async updateOne(activityId: string, activityChanges: Partial<Activity.CreateDto>): Promise<'UPDATED' | 'ERROR'> {
    try {
      await this.activitiesRepository.update(activityId, activityChanges);
      return 'UPDATED';
    } catch (error) {
      return 'ERROR';
    }
  }
}
