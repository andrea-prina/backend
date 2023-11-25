import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './User';
import { UserActivityEntity } from './UserActivity';

@Entity('activity')
export class ActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uiid: string;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('varchar', { length: 200 })
  description: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'timestamp' })
  startTimestamp: Date;

  @Column({ type: 'timestamp' })
  endTimestamp: Date;

  @Column({ type: 'timestamp' })
  duration: Date;

  @Column('int')
  maxParticipants: number;

  @Column({ type: 'timestamp', nullable: true })
  pollDeadline?: Date;

  @Column({ type: 'simple-array' })
  pollOptions: Date[];

  @ManyToOne((type) => UserEntity, (user) => user.ownedActivities) owner: UserEntity;

  @OneToMany((type) => UserActivityEntity, (userActivity) => userActivity.activity) attendees: UserActivityEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
