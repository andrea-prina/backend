import { ActivityEntity } from '../database/entities/Activity';

export namespace Activity {
  export type CreateDto = Omit<ActivityEntity, 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
}
