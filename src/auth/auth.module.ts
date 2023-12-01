import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { configuration as config } from 'src/config/configuration';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config().jwt_secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, BcryptService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
