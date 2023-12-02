import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { configuration as config } from 'src/config/configuration';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcrypt: BcryptService
  ) {}

  async validateUser(email: string, password: string): Promise<User.Response | null> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      if (this.bcrypt.comparePassword(password, user.password)) return user;
    }
    return null;
  }

  async login(req: { email: string; password: string }): Promise<{ access_token: string } | null> {
    const user = await this.validateUser(req.email, req.password);
    if (user) {
      const payload = { email: user.email };
      return { access_token: this.jwtService.sign(payload, { secret: config().jwt_secret }) };
    }
    return null;
  }

  async signup(user: User.CreateDto): Promise<{ access_token: string } | BadRequestException> {
    const password = await this.bcrypt.hashPassword(user.password);
    try {
      const newUser: User.Response = await this.userService.createOne({ ...user, password });
      return { access_token: this.jwtService.sign(newUser.email) };
    } catch (QueryFailedError) {
      // TODO: Catch the specific errors
      if (/(email)[\s\S]+(already exists)/.test(QueryFailedError.detail)) {
        throw new BadRequestException('There is already an account with this email');
      }
    }
  }
}
