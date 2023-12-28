import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityParticipantEntity } from 'src/database/entities/ActivityParticipant';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityParticipantService {
  constructor(
    @InjectRepository(ActivityParticipantEntity) private participantRepository: Repository<ActivityParticipantEntity>
  ) {}

  async addToActivity(activityUiid: string, userEmail: string) {
    const newParticipant: ActivityParticipantEntity = this.participantRepository.create({
      userEmail: userEmail,
      activityUiid: activityUiid,
      voted: true,
    });
    return this.participantRepository.save(newParticipant);
  }
  async checkIfVoted(activityUiid: string, userEmail: string): Promise<boolean> {
    const hasAlreadyVoted: any = await this.participantRepository
      .createQueryBuilder('activity_participant')
      .select('activity_participant.voted')
      .where('activity_participant.activityUiid = :activityUiid', { activityUiid: activityUiid })
      .andWhere('activity_participant.userEmail = :userEmail', { userEmail: userEmail })
      .getRawOne();

    // FIXME: undefined means NOT INVITED (not present in activity_participant), thus should be handled with a different error. This check is for development
    if (hasAlreadyVoted !== undefined) {
      return hasAlreadyVoted['activity_participant_voted']; // TODO: implement
    } else {
      return false;
    }
  }
}
