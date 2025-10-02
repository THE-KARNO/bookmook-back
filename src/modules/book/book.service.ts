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

  async update(createBookDto: CreateBookDto, id: string): Promise<void> {
    const { name, author, translator, publisher, price, category, ISBN } =
      createBookDto;

    const newBookInformation = await this.bookRepository.update(id, {
      name,
      author,
      translator,
      publisher,
      price,
      category,
      ISBN,
    });

    if (newBookInformation.affected === 0) {
      throw new NotFoundException();
    }

    return;
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id } });
    console.log(book);

    if (!book) {
      throw new NotFoundException();
    }

    await this.bookRepository.delete(book.id);
    return;
  }
}
