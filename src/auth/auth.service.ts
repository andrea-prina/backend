import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/User';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
  // async validateUser(email: string, pass: string): Promise<User.Response> {
  //   const user = await this.userService.findByEmail(email);
  //   if (user && user.password === pass) {
  //     return user.Response
  //   }
  //   return null;
  // }

  async login(user: any) {
    // FARE VALIDAZIONE PRIMA DI RILASCIARE IL TOKEN E NON USARE LA GUARD

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
