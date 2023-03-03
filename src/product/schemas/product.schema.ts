import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  totalSold: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  pictures: Array<string>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
