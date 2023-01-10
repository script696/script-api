import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(5, 10)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: string;

  @IsString()
  about: string;
}
