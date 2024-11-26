import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(phoneNumber: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.phoneNumber = phoneNumber;
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async login(phoneNumber: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
    return token;
  }
}
