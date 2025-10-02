import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from './database/data-source.js';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [],
})
export class AppModule {}
