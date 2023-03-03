import { IsMongoId } from 'class-validator';

export class GetAllProductsDto {
  @IsMongoId()
  userId: number;
}
