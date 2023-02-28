import { IsMongoId, IsString, Length } from 'class-validator';

export class UpdateProductDescriptionDto {
  @IsMongoId()
  id: number;

  @IsString()
  @Length(5, 15)
  title: string;

  @IsString()
  @Length(40, 400)
  description: string;
}
