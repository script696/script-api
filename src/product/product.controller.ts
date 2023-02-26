import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Put,
  Req,
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
    console.log(userId, productId, file);
    return await this.productService.addPicture(userId, productId, file);
  }
}
