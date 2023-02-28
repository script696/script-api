import { IsMongoId } from 'class-validator';

export class AddPictureDto {
  @IsMongoId()
  productId: string;
}
