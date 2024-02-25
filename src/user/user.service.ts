import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/User';
import { Repository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    // TODO: Handle missing userEmail error and remove 'undefined' from typing
    const res: UserEntity = await this.usersRepository.findOne({ where: { email } });
    return res;
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createOne(user: User.CreateDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async updateOne(userEmail: string, updateData: Partial<UserEntity>) {
    const userToUpdate = await this.findByEmail(userEmail);
    if (!userToUpdate) {
      // Handle case where the user with the specified ID is not found
      throw new Error('User not found');
    }
    // Update user data
    Object.assign(userToUpdate, updateData);
    // Save the updated user to the database
    return this.usersRepository.save(userToUpdate);
  }
}
