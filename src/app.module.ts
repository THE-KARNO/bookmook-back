import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from './database/data-source.js';
import { BookModule } from './modules/book/book.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    BookModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
