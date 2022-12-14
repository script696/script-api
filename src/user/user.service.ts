import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail({ email }): Promise<any> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async register({ username, email, password, role }): Promise<any> {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с таким ${email} уже существует`);
    }
    // const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuidv4();

    const user = await this.userModel.create({
      username,
      email,
      password,
      role,
      activateLink,
    });
    return { username, email, password, role, activateLink };
  }
}
