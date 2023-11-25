import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User';
import { Repository } from 'typeorm';
import { UserNamespace } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    // TODO: TOGLIERE UNDEFINED E GESTIRE L'ERRORE SE NON TROVA LO USER
    const res: User = await this.usersRepository.findOne({ where: { email } });
    return res;
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
