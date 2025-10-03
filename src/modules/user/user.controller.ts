import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service.js';
import { User } from '../auth/user.entity.js';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
@UseGuards(AuthGuard('jwt-access'))
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Put()
  update(
    @Req() req,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const user: User = req.user;
    return this.userService.update(user.id, updateUserDto);
  }

  @Patch('/role/:id')
  changeRole(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.changeRole(id);
  }
}
