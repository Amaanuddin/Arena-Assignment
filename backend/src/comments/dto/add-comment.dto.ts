import { IsEthereumAddress, IsString, MaxLength } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @MaxLength(280)
  content: string;
}
