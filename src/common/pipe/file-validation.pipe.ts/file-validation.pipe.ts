import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipeTsPipe implements PipeTransform {
  private readonly allowedMemeType = ['image/jpeg', 'image/png', 'image/jpg'];
  private readonly maxSize = 10 * 1024 * 1024; // 10 MB

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!this.allowedMemeType.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException('File to large');
    }

    return file;
  }
}
