import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegistrationResponse } from './types/user.typedef';
import { FileService } from '../file/file.service';
import { RegistrationDto } from '../auth/dto/RegistrationDto';
import { UpdateUserDto } from './dto/updateUserDto';

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

  async updateUser(id: string, userData: UpdateUserDto, picture) {
    console.log(picture);
    const staticPath = `users/${id}/avatar`;
    const user = await this.userModel.findById(id);

    /**
     * Определяем url путь аватара
     * если при обновлении профиля было изменение аватара - picture !== null => удаляем старую пикчу и обвновляем путь
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

    await user.save();
    return user;
  }

  async register({
    username,
    email,
    password,
    role,
  }: RegistrationDto): Promise<RegistrationResponse> {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new ConflictException(
        [`User with email ${email} is already exist`],
        'Conflict Error',
      );
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
