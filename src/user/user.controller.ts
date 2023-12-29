import { Controller, Get, Param } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/User';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getByOperatorId(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(+id);
  }

  // TODO: update email / password

  // TODO: delete user
}
