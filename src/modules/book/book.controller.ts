import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

import { BookService } from './book.service.js';
import { Book } from './book.entity.js';
import { FileValidationPipe } from '../../common/pipe/file-validation.pipe.js';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard.js';

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

  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,
  ): Promise<void> {
    return this.bookService.create(createBookDto, file.originalname);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() createBookDto: CreateBookDto,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,
  ): Promise<void> {
    return this.bookService.update(createBookDto, id, file.originalname);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.bookService.remove(id);
  }
}
