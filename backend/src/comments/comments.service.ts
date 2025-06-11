import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async addComment(postId: number, wallet: string, content: string): Promise<Comment> {
    const comment = this.commentsRepository.create({
      post_id: postId,
      wallet_address: wallet,
      content,
    });
    return this.commentsRepository.save(comment);
  }
}
