import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  identifier: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(16)
  password: string;
}
