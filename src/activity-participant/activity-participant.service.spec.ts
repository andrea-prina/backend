import { Test, TestingModule } from '@nestjs/testing';
import { ActivityParticipantService } from './activity-participant.service';

describe('ActivityParticipantService', () => {
  let service: ActivityParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityParticipantService],
    }).compile();

    service = module.get<ActivityParticipantService>(ActivityParticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
