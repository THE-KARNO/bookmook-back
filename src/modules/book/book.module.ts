import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';

import { BookService } from './book.service.js';
import { BookController } from './book.controller.js';
import { Book } from './book.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),

    MulterModule.register({
      storage: diskStorage({
        destination: '../../../uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
