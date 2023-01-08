import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  about: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
