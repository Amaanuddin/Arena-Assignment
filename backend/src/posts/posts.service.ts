import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find({
      order: { timestamp: 'DESC' },
      relations: ['user', 'likes', 'comments'],
    });
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    return this.postsRepository.save(data);
  }

  async getPostWithDetails(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'likes', 'comments', 'comments.user'],
    });
  }
}
