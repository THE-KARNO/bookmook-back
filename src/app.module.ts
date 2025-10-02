import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from './database/data-source.js';
import { BookModule } from './modules/book/book.module.js';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
