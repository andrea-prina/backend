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

  @Column({ type: 'bigint' })
  startTimestamp: number;

  @Column({ type: 'bigint' })
  endTimestamp: number;

  @Column({ type: 'bigint' })
  duration: number;

  @Column('int')
  maxParticipants: number;

  @Column({ type: 'bigint', nullable: true })
  pollDeadline?: number;

  @Column({ type: 'bigint', array: true })
  pollOptions: number[];

  @ManyToOne(() => UserEntity, (user) => user.ownedActivities) owner: UserEntity;

  @OneToMany(() => UserActivityEntity, (userActivity) => userActivity.activity) attendees: UserActivityEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
