// import { IsEmail, Length, IsDate } from 'class-validator';
import { UserEntity } from '../database/entities/User';

export namespace User {
  export type Response = Omit<UserEntity, 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
  export type CreateDto = Omit<UserEntity, 'createdAt' | 'updatedAt' | 'deletedAt'>;
}
