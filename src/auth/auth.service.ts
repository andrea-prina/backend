import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { configuration as config } from 'src/config/configuration';
import { ConfigService } from '@nestjs/config';

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
      if (this.bcrypt.compareHashedData(password, user.password)) return user;
    }
    return null;
  }

  async login(req: { email: string; password: string }): Promise<{ accessToken: string } | null> {
    const user = await this.validateUser(req.email, req.password);
    if (user) {
      const tokens = await this.getTokens(user.email);
      // Set the current refresh token for the user in database
      await this.updateHashedRefreshToken(user.email, tokens.refreshToken);
      return tokens;
    }
    return null;
  }

  async signup(user: User.CreateDto): Promise<{ accessToken: string } | BadRequestException> {
    const password = await this.bcrypt.hashData(user.password);
    try {
      // Create the user
      const newUser: User.Response = await this.userService.createOne({ ...user, password });
      // Generate access token and refresh token
      const tokens = await this.getTokens(newUser.email);
      // Set the current refresh token for the user in database
      await this.updateHashedRefreshToken(newUser.email, tokens.refreshToken);
      return tokens;
    } catch (QueryFailedError) {
      // TODO: Catch the specific errors
      if (/(email)[\s\S]+(already exists)/.test(QueryFailedError.detail)) {
        throw new BadRequestException('existingUser');
      }
    }
  }

  async logout(userEmail: string) {
    return this.userService.updateOne(userEmail, { hashedRefreshToken: null });
  }

  async getTokens(userEmail: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userEmail, // identifier of the user
        },
        {
          secret: config().jwt.access_secret,
          expiresIn: config().jwt.access_exp,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userEmail, // identifier of the user
        },
        {
          secret: config().jwt.access_secret,
          expiresIn: config().jwt.refresh_exp,
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateHashedRefreshToken(userEmail: string, refreshToken: string) {
    const hashedRefreshToken = await this.bcrypt.hashData(refreshToken);
    await this.userService.updateOne(userEmail, {
      hashedRefreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userEmail: string, refreshToken: string) {
    // Refresh the access token by verifying the refresh token, then issue new access token and refresh token

    if (this.isRefreshTokenExpired(refreshToken)) {
      await this.logout(userEmail);
      throw new ForbiddenException('Refresh Token Expired');
    }

    const user = await this.userService.findByEmail(userEmail);
    if (!user || !user.hashedRefreshToken) throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = this.bcrypt.compareHashedData(refreshToken, user.hashedRefreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.email);
    await this.updateHashedRefreshToken(user.email, tokens.refreshToken);
    return tokens;
  }

  isRefreshTokenExpired(refreshToken: string): boolean {
    const decoded = this.jwtService.decode(refreshToken);
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    console.log(expirationTime, currentTime);
    return expirationTime <= currentTime;
  }
}
