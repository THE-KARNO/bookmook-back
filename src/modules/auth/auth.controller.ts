import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { AccessTokenGuard } from '../../common/guards/access-token.guard.js';
import { User } from './user.entity.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @UseGuards(AccessTokenGuard)
  getMe(@Req() req): User {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signup(createUserDto);
  }

  @Post('/signin')
  signin(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signin(loginUserDto);
  }
}
