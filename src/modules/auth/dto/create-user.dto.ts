import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  phone: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minSymbols: 0,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;
}
