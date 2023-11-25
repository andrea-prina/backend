import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: { email: string; password: string }) {
    return this.authService.login(req);
  }

  @Post('signup')
  async signup(@Body() user: User.CreateDto) {
    return this.authService.signup(user);
  }
}
