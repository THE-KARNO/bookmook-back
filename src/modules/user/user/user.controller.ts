import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { UserService } from './user.service.js';
import { User } from 'src/modules/auth/user.entity.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt-access'))
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }
}
