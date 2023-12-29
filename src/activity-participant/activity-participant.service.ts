import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityParticipantEntity } from 'src/database/entities/ActivityParticipant';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityParticipantService {
  constructor(
    @InjectRepository(ActivityParticipantEntity) private participantRepository: Repository<ActivityParticipantEntity>
  ) {}

  async addToActivity(activityUiid: string, userEmail: string, hasVoted: boolean) {
    const newParticipant: ActivityParticipantEntity = this.participantRepository.create({
      userEmail: userEmail,
      activityUiid: activityUiid,
      hasVoted: hasVoted,
    });
    return this.participantRepository.save(newParticipant);
  }

  // TODO: updateHasVoted - create this method and use it to update 'activity_participant.hasVoted' to 'true' after poll vote or in 'addToActivity' and 'removeFromActivity'
  async updateHasVoted(activityUiid: string, userEmail: string) {
    return true;
  }

  async checkIfVoted(activityUiid: string, userEmail: string): Promise<boolean> {
    const hasAlreadyVoted: any = await this.participantRepository
      .createQueryBuilder('activity_participant')
      .select('activity_participant."hasVoted" AS "hasVoted"')
      .where('activity_participant.activityUiid = :activityUiid', { activityUiid: activityUiid })
      .andWhere('activity_participant.userEmail = :userEmail', { userEmail: userEmail })
      .getRawOne();

    // FIXME: checkIfVoted undefined means NOT INVITED (not present in activity_participant), thus should be handled with a different error. This check is for development
    if (hasAlreadyVoted !== undefined) {
      return hasAlreadyVoted['hasVoted'];
    } else {
      return false;
    }
  }
}
