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

@Entity('activity_participant')
export class ActivityParticipantEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  hasVoted: boolean;

  @Column()
  userEmail: string;

  @ManyToOne(() => UserEntity, (user) => user.joinedActivities)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: UserEntity;

  @Column()
  activityUiid: string;

  @ManyToOne(() => ActivityEntity, (activity) => activity.participants, {})
  @JoinColumn({ name: 'activityUiid', referencedColumnName: 'uiid' })
  activity: ActivityEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
