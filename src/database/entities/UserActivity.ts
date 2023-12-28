import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './User';
import { ActivityEntity } from './Activity';

@Entity('user_activity')
export class UserActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  attendanceDates: number; // remove 's'

  @Column()
  userEmail: string;

  @ManyToOne(() => UserEntity, (user) => user.attendedActivities)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: UserEntity;

  @Column()
  activityUiid: string;

  @ManyToOne(() => ActivityEntity, (activity) => activity.attendees, {})
  @JoinColumn({ name: 'activityUiid', referencedColumnName: 'uiid' })
  activity: ActivityEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
