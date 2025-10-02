import { Controller, Get } from '@nestjs/common';

import { BookService } from './book.service.js';
import { Book } from './book.entity.js';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('')
  getAll(): Promise<Book[]> {
    return this.bookService.getAll();
  }
}
