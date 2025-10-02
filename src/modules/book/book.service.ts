import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './book.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAll(): Promise<Book[]> {
    const books = await this.bookRepository.find();
    return books;
  }

  async getOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<void> {
    const { name, author, translator, publisher, price, category, ISBN } =
      createBookDto;

    const createBook = this.bookRepository.create({
      name,
      author,
      translator,
      publisher,
      price,
      category,
      ISBN,
    });

    await this.bookRepository.save(createBook);
    return;
  }
}
