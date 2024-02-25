import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { PollVoteModule } from './poll-vote/poll-vote.module';
import { ActivityParticipantModule } from './activity-participant/activity-participant.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    DatabaseModule,
    UserModule,
    ActivityModule,
    AuthModule,
    BcryptModule,
    PollVoteModule,
    ActivityParticipantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// TODO: Fix typing across the app
// TODO: Write unit tests, start develop with TDD approach
