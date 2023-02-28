import { IsMongoId, IsString } from 'class-validator';

export class DeleteProductPictureDto {
  @IsMongoId()
  productId: number;

  @IsString()
  pictureUrl: string;
}
