import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivityEntity } from 'src/database/entities/UserActivity';
import { Repository } from 'typeorm';

@Injectable()
export class UserActivityService {
  constructor(@InjectRepository(UserActivityEntity) private pollRepository: Repository<UserActivityEntity>) {}

  async vote(activityUiid: string, userEmail: string, attendanceDates: number[]): Promise<void> {
    for (let index = 0; index < attendanceDates.length; index++) {
      const pollDate = attendanceDates[index];
      const pollVote: UserActivityEntity = this.pollRepository.create();
      pollVote.attendanceDates = pollDate;
      pollVote.activityUiid = activityUiid;
      pollVote.userEmail = userEmail;
      await this.pollRepository.save(pollVote);
    }
  }

  async getPollVotesCountByActivityId(id: string) {
    const votes = await this.pollRepository
      .createQueryBuilder('user_activity')
      .select(['user_activity.attendanceDates AS "pollDate"', 'COUNT(user_activity.attendanceDates)'])
      .where('user_activity.activityUiid = :activityUiid', { activityUiid: id })
      .groupBy('user_activity.attendanceDates')
      .getRawMany();
    return votes;
  }

  async getPollParticipantsByActivityId(id: string) {
    const results = await this.pollRepository
      .createQueryBuilder('user_activity')
      .select('DISTINCT user_activity.userEmail')
      .where('user_activity.activityUiid = :activityUiid', { activityUiid: id })
      .getRawMany();

    const participantsEmail = results.map((result) => result.userEmail);
    return participantsEmail;
  }
}
