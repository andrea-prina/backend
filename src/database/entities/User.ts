import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActivityEntity } from './Activity';
import { UserActivityEntity } from './UserActivity';

@Entity('usr')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  firstName: string;

  @Column('varchar', { length: 30 })
  lastName: string;

  @Column('varchar', { length: 30, unique: true })
  email: string;

  @Column('varchar', { length: 72 })
  password: string;

  @OneToMany(() => ActivityEntity, (activity) => activity.owner) ownedActivities: ActivityEntity[];

  @OneToMany(() => UserActivityEntity, (userActivity) => userActivity.user)
  attendedActivities: UserActivityEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
