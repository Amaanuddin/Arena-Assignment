import { IsEthereumAddress, IsString } from 'class-validator';

export class VerifyAuthDto {
  @IsEthereumAddress()
  wallet_address: string;

  @IsString()
  signature: string;

  @IsString()
  message: string;
}
