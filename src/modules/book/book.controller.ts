import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

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

  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
    return this.bookService.getOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<void> {
    return this.bookService.create(createBookDto);
  }
}
