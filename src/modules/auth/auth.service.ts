import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Redis } from 'ioredis';

import { User } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { TokenService } from '../tokens/token.service.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
    private readonly tokenService: TokenService,
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

  async signin(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { identifier, password } = loginUserDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('username =:identifier OR email =:identifier', { identifier })
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.tokenService.accessToken(user);
    const refreshToken = await this.tokenService.refreshToken(user);

    await this.redis.set(`refresh-token-for:${user.username}`, refreshToken);
    return { accessToken, refreshToken };
  }

  async refreshToken(user: User): Promise<{ accessToken: string }> {
    const accessToken = await this.tokenService.accessToken(user);
    const isRefreshTokenNotExpired = await this.redis.get(
      `refresh-token-for:${user.username}`,
    );

    if (!isRefreshTokenNotExpired) {
      throw new UnauthorizedException();
    }

    return { accessToken };
  }

  async logout(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.redis.del(`refresh-token-for:${user.username}`);

    return;
  }
}
