import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<void> {
    const { fullName, username, phone, email, password } = createUserDto;

    const isUserExist = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (isUserExist) {
      throw new ConflictException('username or email already exist');
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = this.userRepository.create({
      fullName,
      username,
      email,
      phone,
      password: hashPassword,
    });

    await this.userRepository.save(user);
  }
}
