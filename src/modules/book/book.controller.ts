import { Body, Controller, Get, Post } from '@nestjs/common';

import { BookService } from './book.service.js';
import { Book } from './book.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.bookService.getAll();
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<void> {
    return this.bookService.create(createBookDto);
  }
}
