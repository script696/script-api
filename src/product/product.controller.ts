import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { UpdateProductDescriptionDto } from './dto/UpdateProductDescriptionDto';
import { UpdateServiceInfoDto } from './dto/UpdateServiceInfoDto';
import { UpdatePublicInfoDto } from './dto/UpdatePublicInfoDto';
import { DeleteProductDto } from './dto/DeleteProductDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddPictureDto } from './dto/AddPictureDto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { DeleteProductPictureDto } from './dto/DeleteProductPictureDto';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/getAll')
  async getAllProducts(@Query('userId') userId: string) {
    if (typeof userId !== 'string' || !userId) {
      // throw new Error('Test Error');
      return [];
    }
    return await this.productService.getAllProducts(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  async createProduct(@Body() body: CreateProductDto, @Request() req) {
    const owner = req.user.sub;

    return await this.productService.createProduct({ ...body, owner });
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

  @UseGuards(AccessTokenGuard)
  @Post('/deleteProduct')
  async deleteProduct(@Request() req, @Body() body: DeleteProductDto) {
    const { id: productId } = body;
    const userId = req.user.sub;
    return await this.productService.deleteProduct(userId, productId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/addPicture')
  @UseInterceptors(FileInterceptor('picture'))
  async addPicture(
    @Request() req,
    @Body() body: AddPictureDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build({ fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ) {
    const userId = req.user.sub;
    const { productId } = body;

    return await this.productService.addPicture(userId, productId, file);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/removeProductPicture')
  async deleteProductPicture(
    @Request() req,
    @Body() body: DeleteProductPictureDto,
  ) {
    return await this.productService.deleteProductPicture(body);
  }
}
