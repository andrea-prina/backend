import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'PollMyActivity BackEnd app and running...';
  }
}
