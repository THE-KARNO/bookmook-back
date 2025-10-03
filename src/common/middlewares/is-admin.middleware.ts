import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { AuthRole } from 'src/modules/auth/enums/auth-role.enum.js';
import { User } from 'src/modules/auth/user.entity.js';

dotenv.config();

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader?.split(' ')[1];

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new UnauthorizedException();
    }
    req['user'] = payload;

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.role !== AuthRole.USER) {
      throw new ForbiddenException();
    }

    next();
  }
}
