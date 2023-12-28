import { Module } from '@nestjs/common';
import { PollVoteService } from './poll-vote.service';
import { PollVoteController } from './poll-vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollVoteEntity } from 'src/database/entities/PollVote';
import { DatabaseModule } from 'src/database/database.module';
import { ActivityEntity } from 'src/database/entities/Activity';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityParticipantEntity } from 'src/database/entities/ActivityParticipant';
import { ActivityParticipantService } from 'src/activity-participant/activity-participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([PollVoteEntity, ActivityEntity, ActivityParticipantEntity]), DatabaseModule],
  providers: [PollVoteService, ActivityService, ActivityParticipantService],
  controllers: [PollVoteController],
})
export class PollVoteModule {}
