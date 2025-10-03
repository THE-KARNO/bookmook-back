import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { AuthRole } from '../../modules/auth/enums/auth-role.enum.js';
import { UserService } from '../../modules/user/user.service.js';

dotenv.config();

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

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

    const user = await this.userService.getOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.role === AuthRole.USER) {
      throw new ForbiddenException();
    }

    next();
  }
}
