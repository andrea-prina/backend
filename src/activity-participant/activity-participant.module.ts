import { Module } from '@nestjs/common';
import { ActivityParticipantController } from './activity-participant.controller';
import { ActivityParticipantService } from './activity-participant.service';
import { ActivityParticipantEntity } from 'src/database/entities/ActivityParticipant';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityParticipantEntity]), DatabaseModule],
  controllers: [ActivityParticipantController],
  providers: [ActivityParticipantService],
  exports: [ActivityParticipantService],
})
export class ActivityParticipantModule {}
