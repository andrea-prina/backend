import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivityController } from './user-activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityEntity } from 'src/database/entities/UserActivity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivityEntity]), DatabaseModule],
  providers: [UserActivityService],
  controllers: [UserActivityController],
})
export class UserActivityModule {}
