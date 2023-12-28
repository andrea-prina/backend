import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityParticipantService } from 'src/activity-participant/activity-participant.service';
import { ActivityService } from 'src/activity/activity.service';
import { PollVoteEntity } from 'src/database/entities/PollVote';
import { Repository } from 'typeorm';

@Injectable()
export class PollVoteService {
  constructor(
    @InjectRepository(PollVoteEntity) private pollRepository: Repository<PollVoteEntity>,
    private activityService: ActivityService,
    private participantService: ActivityParticipantService
  ) {}

  async vote(activityUiid: string, userEmail: string, attendanceDates: number[]): Promise<void> {
    const pollOptionsForActivity: string[] = await this.activityService.getPollOptions(activityUiid);
    const hasAlreadyVoted: boolean = await this.participantService.checkIfVoted(activityUiid, userEmail);

    if (hasAlreadyVoted) throw Error('Has already voted'); // TODO: Return error message

    for (let index = 0; index < attendanceDates.length; index++) {
      const pollDate = attendanceDates[index];

      // if (!pollOptionsForActivity.includes(pollDate.toString())) throw Error('Invalid poll option'); // TODO: Return error message

      const pollVote: PollVoteEntity = this.pollRepository.create();
      pollVote.attendanceDate = pollDate;
      pollVote.activityUiid = activityUiid;
      pollVote.userEmail = userEmail;
      await this.pollRepository.save(pollVote);
    }

    await this.participantService.addToActivity(activityUiid, userEmail);
  }

  async getPollVotesCountByActivityId(id: string) {
    // const results = await this.pollRepository.findBy({ activityUiid: id });
    // const votes = {};
    // results.forEach((item) => {
    //   const attendanceDates = item.attendanceDates;
    //   votes[attendanceDates] = (votes[attendanceDates] || 0) + 1;
    // });
    const votes = await this.pollRepository
      .createQueryBuilder('poll_vote')
      .select(['poll_vote.attendanceDate AS "pollDate"', 'COUNT(poll_vote.attendanceDate)'])
      .where('poll_vote.activityUiid = :activityUiid', { activityUiid: id })
      .groupBy('poll_vote.attendanceDate')
      .getRawMany();
    return votes;
  }

  async getPollParticipantsByActivityId(id: string) {
    const results = await this.pollRepository
      .createQueryBuilder('poll_vote')
      .select('DISTINCT poll_vote.userEmail')
      .where('poll_vote.activityUiid = :activityUiid', { activityUiid: id })
      .getRawMany();

    const participantsEmail = results.map((result) => result.userEmail);
    return participantsEmail;
  }
}
