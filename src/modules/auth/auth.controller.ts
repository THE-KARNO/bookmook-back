import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signup(createUserDto);
  }
}
