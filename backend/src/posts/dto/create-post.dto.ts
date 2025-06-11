import { IsEthereumAddress, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(280)
  content: string;
}
