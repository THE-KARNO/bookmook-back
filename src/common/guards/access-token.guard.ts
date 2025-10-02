import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { User } from 'src/modules/auth/user.entity.js';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    await super.canActivate(context);

    const req = request as Request & { user: User };
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.isBan) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
