import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/database/entities/User';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getByOperatorId(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }
}
