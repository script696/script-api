import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/CreateProductDto';
import { UpdateProductDescriptionDto } from './dto/UpdateProductDescriptionDto';
import { UpdateServiceInfoDto } from './dto/UpdateServiceInfoDto';
import { UpdatePublicInfoDto } from './dto/UpdatePublicInfoDto';
import { DeleteProductDto } from './dto/DeleteProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}
  async getAllProducts() {
    const allProducts = await this.ProductModel.find();
    return allProducts.map(
      ({
        _id,
        title,
        description,
        discount,
        totalSold,
        url,
        price,
        amount,
      }) => ({
        id: _id,
        title,
        description,
        discount,
        totalSold,
        url,
        price,
        amount,
      }),
    );
  }
  async createProduct(productData: CreateProductDto) {
    const {
      _id: id,
      title,
      description,
      discount,
      totalSold,
      url,
      price,
      amount,
    } = await this.ProductModel.create(productData);
    return {
      id,
      title,
      description,
      discount,
      totalSold,
      url,
      price,
      amount,
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

  async deleteProduct({ id }: DeleteProductDto) {
    const product = await this.ProductModel.findByIdAndDelete(id);

    return {
      id,
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
}
