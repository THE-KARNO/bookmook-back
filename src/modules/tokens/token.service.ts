import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dotenv from 'dotenv';

import { User } from '../auth/user.entity.js';

dotenv.config();

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async accessToken(user: User) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
      algorithm: 'HS512',
    });

    return accessToken;
  }

  async refreshToken(user: User) {
    const payload = { sub: user.id, email: user.email };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
      algorithm: 'HS512',
    });

    return refreshToken;
  }
}
