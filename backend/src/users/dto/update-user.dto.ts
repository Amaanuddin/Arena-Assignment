import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value === "" ? undefined : value)
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
