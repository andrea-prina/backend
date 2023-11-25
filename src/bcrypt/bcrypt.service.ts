import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(rawPassword: string, rounds?: number | 10) {
    const SALT: string = await bcrypt.genSalt(rounds);
    const hashedPassword: string = await bcrypt.hash(rawPassword, SALT);
    return hashedPassword;
  }

  async comparePassword(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword);
  }
}
