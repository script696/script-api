import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegistrationParams, RegistrationResponse } from './types/user.typedef';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getAllUsers() {
    const allUsers = await this.userModel.find();
    return allUsers;
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    const { username, email, role } = user;

    return { username, email, role };
  }

  async register({
    username,
    email,
    password,
    role,
  }: RegistrationParams): Promise<RegistrationResponse> {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с таким ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await this.userModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    return { email: user.email, id: user._id };
  }
}
