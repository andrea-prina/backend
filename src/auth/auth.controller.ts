import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  // Use throttler to protect routes not protected with JWT TODO: might be worth to extend to all routes with different TTL/limi
  @UseGuards(ThrottlerGuard)
  @Post('login')
  async login(@Body() req: { email: string; password: string }) {
    return await this.authService.login(req);
  }

  @UseGuards(ThrottlerGuard)
  @Post('logout')
  async logout(@Body() body: { email: string }) {
    return await this.authService.logout(body.email);
  }

  @UseGuards(ThrottlerGuard)
  @Post('signup')
  async signup(@Body() user: User.CreateDto) {
    return await this.authService.signup(user);
  }

  @UseGuards(ThrottlerGuard)
  @Post('refresh')
  refreshTokens(@Body() body: { userEmail: string; refreshToken: string }) {
    return this.authService.refreshTokens(body.userEmail, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-jwt')
  testJWT(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const userEmail = this.jwtService.decode(jwt).sub;
    return userEmail;
  }
}
