import { IsMongoId, IsNumber } from 'class-validator';

export class UpdateServiceInfoDto {
  @IsMongoId()
  id: number;

  @IsNumber()
  totalSold: number;

  @IsNumber()
  amount: number;
}
