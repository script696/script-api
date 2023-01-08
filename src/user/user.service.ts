import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegistrationParams, RegistrationResponse } from './types/user.typedef';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}
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
    const { username, email, role, about, avatar } = user;

    return { username, email, role, about, avatar };
  }

  async updateUser(id, userData, picture) {
    const staticPath = `users/${id}/avatar`;
    const user = await this.userModel.findById(id);

    /**
     * Определяем url путь аватара
     * - если при обновлении профиля было изменение аватара - picture !== null => удаляем старую пикчу и обвновляем путь
     * в бд
     */
    if (picture) {
      this.fileService.removeAllFilesInDir({ staticPath });

      user.avatar = this.fileService.createFile({
        staticPath,
        file: picture,
      });
    }

    user.username = userData.username;
    user.email = userData.email;
    user.about = userData.about;
    user.role = userData.role;

    user.save();
    return user;
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
