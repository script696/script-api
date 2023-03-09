import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateProductDto {
  @Length(5, 40)
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @IsNumber()
  totalSold: number;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  url: string;
}
