import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from 'src/database/entities/Activity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private usersRepository: Repository<ActivityEntity>
  ) {}

  findAll(): Promise<ActivityEntity[]> {
    return this.usersRepository.find();
  }

  findOne(uiid: string): Promise<ActivityEntity | null> {
    return this.usersRepository.findOneBy({ uiid });
  }
}
