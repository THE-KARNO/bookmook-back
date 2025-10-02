import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { User } from './user.entity.js';
import { TokensModule } from '../tokens/token.module.js';
import { RedisModule } from '../redis/redis.module.js';
import { AccessTokenStrategy } from './strategies/jwt-access-token.strategy.js';
import { RefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy.js';
import { AccessTokenGuard } from '../../common/guards/access-token.guard.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    TokensModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
  ],
})
export class AuthModule {}
