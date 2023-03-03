import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/CreateProductDto';
import { UpdateProductDescriptionDto } from './dto/UpdateProductDescriptionDto';
import { UpdateServiceInfoDto } from './dto/UpdateServiceInfoDto';
import { UpdatePublicInfoDto } from './dto/UpdatePublicInfoDto';
import { FileService } from '../file/file.service';
import { DeleteProductPictureDto } from './dto/DeleteProductPictureDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
    private fileService: FileService,
  ) {}
  async getAllProducts(userId: string) {
    console.log(userId);
    const allProducts = await this.ProductModel.find({ owner: userId });
    return allProducts.map(
      ({
        _id,
        title,
        description,
        discount,
        totalSold,
        pictures,
        price,
        amount,
        owner,
      }) => ({
        id: _id,
        title,
        description,
        discount,
        totalSold,
        pictures,
        price,
        amount,
        owner,
      }),
    );
  }
  async createProduct(productData: CreateProductDto & { owner: string }) {
    const {
      _id: id,
      title,
      description,
      discount,
      totalSold,
      pictures,
      price,
      amount,
      owner,
    } = await this.ProductModel.create(productData);
    return {
      id,
      title,
      description,
      discount,
      totalSold,
      pictures,
      price,
      amount,
      owner,
    };
  }
  async updateDescription({
    id,
    title,
    description,
  }: UpdateProductDescriptionDto) {
    const product = await this.ProductModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );

    return {
      id,
      title: product.title,
      description: product.description,
    };
  }

  async updateServiceInfo({ id, amount, totalSold }: UpdateServiceInfoDto) {
    const product = await this.ProductModel.findByIdAndUpdate(
      id,
      { amount, totalSold },
      { new: true },
    );

    return {
      id,
      amount: product.amount,
      totalSold: product.totalSold,
    };
  }

  async deleteProduct(userId: string, productId: number) {
    const staticPath = `api/admin/${userId}/product/${productId}`;

    await this.ProductModel.findByIdAndDelete(productId);
    this.fileService.removeDir({ staticPath });

    return {
      id: productId,
      message: 'success',
    };
  }
  async updatePublicInfo({ id, price, discount }: UpdatePublicInfoDto) {
    const product = await this.ProductModel.findByIdAndUpdate(
      id,
      { price, discount },
      { new: true },
    );

    return {
      id,
      price: product.price,
      discount: product.discount,
    };
  }

  async addPicture(userId: string, productId: string, picture) {
    const staticPath = `api/admin/${userId}/product/${productId}`;

    const newPictureUrl = this.fileService.createFile({
      staticPath,
      file: picture,
    });

    const product = await this.ProductModel.findByIdAndUpdate(
      productId,
      {
        $push: { pictures: newPictureUrl },
      },
      { new: true },
    );

    return { pictureUrl: product.pictures.at(-1), productId };
  }

  async deleteProductPicture({
    pictureUrl,
    productId,
  }: DeleteProductPictureDto) {
    const product = await this.ProductModel.findById(productId);
    const updatedPictures = product.pictures.filter(
      (picture) => picture !== pictureUrl,
    );
    product.pictures = updatedPictures;
    await product.save();
    await this.fileService.removeFile(pictureUrl);

    return { pictureUrl };
  }
}
