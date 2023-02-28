import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { AuthModule } from '../auth/auth.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ProductController],
  providers: [ProductService, FileService],
  exports: [],
})
export class ProductModule {}
