import { Transform } from 'class-transformer';
import { IsEthereumAddress, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEthereumAddress()
  wallet_address: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
  @MaxLength(280)
  bio?: string;

  @IsOptional()
  @IsUrl()
  @Transform(({ value }) => value === "" ? undefined : value)
  profile_pic_url?: string;
}
