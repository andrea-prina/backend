import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/database/entities/Activity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private usersRepository: Repository<Activity>
  ) {}

  findAll(): Promise<Activity[]> {
    return this.usersRepository.find();
  }

  findOne(uiid: string): Promise<Activity | null> {
    return this.usersRepository.findOneBy({ uiid });
  }
}
