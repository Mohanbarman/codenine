import { IsOptional, IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profilePicture: string;

  @IsString()
  name: string;
}
