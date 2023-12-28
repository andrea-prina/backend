import { Test, TestingModule } from '@nestjs/testing';
import { PollVoteService } from './poll-vote.service';

describe('PollVoteService', () => {
  let service: PollVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PollVoteService],
    }).compile();

    service = module.get<PollVoteService>(PollVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
