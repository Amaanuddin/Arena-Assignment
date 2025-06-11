import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-awth.guard';
import { GetWallet } from 'src/auth/get-wallet.decorator';

@UseGuards(JwtAuthGuard)
@Controller('posts/:id/comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  addComment(
    @Param('id') postId: number,
    @GetWallet() wallet: string,
    @Body('content') content: string
  ) {
    return this.commentsService.addComment(postId, wallet, content);
  }
}
