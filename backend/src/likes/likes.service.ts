import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async likePost(postId: number, wallet: string): Promise<Like> {
    const like = this.likesRepository.create({ post_id: postId, wallet_address: wallet });
    return this.likesRepository.save(like);
  }
}
