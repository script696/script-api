import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  refreshToken: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
