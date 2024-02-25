import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashData(rawData: string, rounds: number = 10) {
    const hashedData: string = await bcrypt.hash(rawData, rounds);
    return hashedData;
  }

  async compareHashedData(rawData: string, hashedData: string) {
    return bcrypt.compare(rawData, hashedData);
  }
}
