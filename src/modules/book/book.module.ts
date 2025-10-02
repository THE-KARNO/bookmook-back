import { Module } from '@nestjs/common';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';

@Module({
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
