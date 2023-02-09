import { Length } from 'class-validator';

export class UpdateBasicAdminInfoDto {
  fullName: string;

  @Length(4, 10)
  nickName: string;

  phoneNumber: string;

  dateOfBirth: string;
}
