import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from 'src/auth/jwt-awth.guard';
import { GetWallet } from 'src/auth/get-wallet.decorator';

@UseGuards(JwtAuthGuard)
@Controller('posts/:id/like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  likePost(@Param('id') postId: number, @GetWallet() wallet: string, ) {
    return this.likesService.likePost(postId, wallet);
  }
}
