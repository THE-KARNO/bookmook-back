import {
  ConflictException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { User } from '../../modules/auth/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);

    await super.canActivate(context);

    const req = request as Request & { user: User };
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: Request): string {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new ConflictException('Missing header');
    }

    return authHeader.split(' ')[1] ?? '';
  }
}
