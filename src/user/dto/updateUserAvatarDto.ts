import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(5, 10)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: string;

  about: string;
}
