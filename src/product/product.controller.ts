import { Body, Controller, Get, Post, Put, Req, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { UpdateProductDescriptionDto } from './dto/UpdateProductDescriptionDto';
import { UpdateServiceInfoDto } from './dto/UpdateServiceInfoDto';
import { UpdatePublicInfoDto } from './dto/UpdatePublicInfoDto';
import { DeleteProductDto } from './dto/DeleteProductDto';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/getAll')
  async getAllProducts(@Req() request: Request) {
    return await this.productService.getAllProducts();
  }

  @Post('/create')
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productService.createProduct(body);
  }

  @Put('/updateDescription')
  async updateDescription(@Body() body: UpdateProductDescriptionDto) {
    return await this.productService.updateDescription(body);
  }

  @Put('/updateServiceInfo')
  async updateServiceInfo(@Body() body: UpdateServiceInfoDto) {
    return await this.productService.updateServiceInfo(body);
  }

  @Put('/updatePublicInfo')
  async updatePublicInfo(@Body() body: UpdatePublicInfoDto) {
    return await this.productService.updatePublicInfo(body);
  }

  @Post('/delete')
  async deleteProduct(@Body() body: DeleteProductDto) {
    return await this.productService.deleteProduct(body);
  }
}
