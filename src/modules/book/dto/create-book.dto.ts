import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  author: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  translator: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  publisher: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(5)
  @Max(99999999)
  price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  ISBN: string;
}
