import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { User } from './user.entity.js';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { AccessTokenGuard } from '../../common/guards/access-token.guard.js';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard.js';

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
  @HttpCode(200)
  signin(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signin(loginUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  @HttpCode(200)
  refreshToken(@Req() req): Promise<{ accessToken: string }> {
    const user = req.user as User;
    return this.authService.refreshToken(user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(204)
  logout(@Req() req): Promise<void> {
    const user: User = req.user;
    return this.authService.logout(user.id);
  }
}
