import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { JwtPayload } from '../interface/jwt-payload.interface.js';
import { User } from '../user.entity.js';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.isBan) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
