import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '../auth/user.entity.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    await this.userRepository.remove(user);
    return;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const { fullName, email, phone, password, address, postalCode } =
      updateUserDto;

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await this.userRepository.update(user.id, {
      fullName,
      email,
      phone,
      password: hashPassword,
      address,
      postalCode,
    });
    return;
  }
}
