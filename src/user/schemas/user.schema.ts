import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  nickName: string;

  @Prop()
  fullName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  addressLine: string;

  @Prop()
  apartment: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
