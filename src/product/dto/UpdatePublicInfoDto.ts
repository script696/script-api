import { IsMongoId, IsNumber } from 'class-validator';

export class UpdatePublicInfoDto {
  @IsMongoId()
  id: number;

  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;
}
