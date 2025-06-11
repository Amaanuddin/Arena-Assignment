import { Controller, Get, Post, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-awth.guard';
import { GetWallet } from 'src/auth/get-wallet.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

 @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async getUser(@GetWallet() wallet: string) {
    const user = await this.usersService.getUserByWallet(wallet);
    if (!user) {
      return { isNew: true };
    }
    return { ...user, isNew: false };
  }

 
  @Post()
  createOrUpdateUser(@Body() body: CreateUserDto) {
    return this.usersService.createOrUpdateUser(body);
  }

  @Patch('me')
  async updateMe(@GetWallet() wallet: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(wallet, dto);
  }
}
