import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from './database/data-source.js';
import { BookModule } from './modules/book/book.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { TokensModule } from './modules/tokens/token.module.js';
import { RedisModule } from './modules/redis/redis.module.js';
import { UserModule } from './modules/user/user.module.js';
import { IsAdminMiddleware } from './common/middlewares/is-admin.middleware.js';
import { UserController } from './modules/user/user.controller.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    BookModule,
    AuthModule,
    TokensModule,
    RedisModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAdminMiddleware).forRoutes(UserController);
  }
}
