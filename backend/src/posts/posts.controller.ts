import { Controller, Get, Post as HttpPost, Param, Body, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-awth.guard';
import { GetWallet } from 'src/auth/get-wallet.decorator';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  createPost(@GetWallet() wallet: string, @Body() body: CreatePostDto) {
    return this.postsService.createPost({...body, wallet_address: wallet});
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPostWithDetails(id);
  }
}
