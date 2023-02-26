import { IsMongoId, IsString, Length } from 'class-validator';

export class UpdateProductDescriptionDto {
  @IsMongoId()
  id: number;

  @Length(5, 20)
  title: string;

  @IsString()
  description: string;
}
