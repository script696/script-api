import { Length } from 'class-validator';

export class UpdateAddressAdminInfoDto {
  @Length(3, 30)
  country: string;

  @Length(3, 30)
  city: string;

  @Length(3, 30)
  addressLine: string;

  @Length(3, 30)
  apartment: string;
}
