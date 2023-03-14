import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { SetCookies } from '@nestjsplus/cookies';
dotenv.config();

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersService.create(email, result);

    const token = this.generateAccessToken(user);

    return { user, token };
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const [salt, storedPassword] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = hash.toString('hex');

    if (storedPassword !== hashedPassword) {
      throw new BadRequestException('invalid credentials');
    }

    const token = this.generateAccessToken(user);

    return { user, token };
  }
  generateAccessToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
  }
}
