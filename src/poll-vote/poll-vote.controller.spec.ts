import { Test, TestingModule } from '@nestjs/testing';
import { PollVoteController } from './poll-vote.controller';

describe('PollVoteController', () => {
  let controller: PollVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollVoteController],
    }).compile();

    controller = module.get<PollVoteController>(PollVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
