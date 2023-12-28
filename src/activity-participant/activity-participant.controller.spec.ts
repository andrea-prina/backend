import { Test, TestingModule } from '@nestjs/testing';
import { ActivityParticipantController } from './activity-participant.controller';

describe('ActivityParticipantController', () => {
  let controller: ActivityParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityParticipantController],
    }).compile();

    controller = module.get<ActivityParticipantController>(ActivityParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
