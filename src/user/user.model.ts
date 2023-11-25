// import { IsEmail, Length, IsDate } from 'class-validator';
import { User } from '../database/entities/User';

export namespace UserNamespace {
  export type Response = Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

  // export class Query {
  //   page!: number;
  //   page_size!: number;
  //   email?: string;
  //   verified?: boolean;
  //   created_at?: Object | null;
  //   workspace_id?: string;
  // }
}
