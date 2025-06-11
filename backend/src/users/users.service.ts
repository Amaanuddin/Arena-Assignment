import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserByWallet(wallet: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { wallet_address: wallet } });
  }

  async createOrUpdateUser(data: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByWallet(data.wallet_address);
    if (existingUser) {
      return this.usersRepository.save({ ...existingUser, ...data });
    }
    return this.usersRepository.save(data);
  }

  async updateUser(wallet: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { wallet_address: wallet } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }
}
