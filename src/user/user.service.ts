import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegistrationResponse } from './types/user.typedef';
import { FileService } from '../file/file.service';
import { RegistrationDto } from '../auth/dto/RegistrationDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { UpdateBasicAdminInfoDto } from './dto/UpdateBasicAdminInfoDto';
import { UpdateAddressAdminInfoDto } from './dto/UpdateAddressAdminInfoDto';

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

    return {
      nickName: user.nickName,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      country: user.country,
      city: user.city,
      addressLine: user.addressLine,
      apartment: user.apartment,
    };
  }

  async checkUserExist(email) {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new ConflictException(
        [`User with email ${email} is already exist`],
        'Conflict Error',
      );
    }
    return candidate;
  }

  async updateUser(id: string, userData: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) return;

    return 'user';
  }

  async updateBasicInfo(id: string, data: UpdateBasicAdminInfoDto) {
    const admin = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    const { fullName, nickName, phoneNumber, dateOfBirth } = admin;
    return { fullName, nickName, phoneNumber, dateOfBirth };
  }

  async updateAddressInfo(id: string, data: UpdateAddressAdminInfoDto) {
    const admin = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    const { country, city, addressLine, apartment } = admin;
    return { country, city, addressLine, apartment };
  }

  async updateUserAvatar(id: string, picture) {
    const staticPath = `api/admin/${id}/avatar`;
    const user = await this.userModel.findById(id);

    // await this.checkUserExist(user.email);
    /**
     * Определяем url путь аватара
     * если при обновлении профиля было изменение аватара - picture !== null => удаляем старую пикчу и обвновляем путь
     * в бд
     */
    if (picture) {
      this.fileService.removeAllFilesInDir({ staticPath });

      user.avatarUrl = this.fileService.createFile({
        staticPath,
        file: picture,
      });
    }

    await user.save();
    return { avatarUrl: user.avatarUrl };
  }

  async register({
    nickName,
    email,
    password,
    role,
  }: RegistrationDto): Promise<RegistrationResponse> {
    await this.checkUserExist(email);

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await this.userModel.create({
      nickName,
      email,
      password: hashPassword,
      role,
    });

    return { email: user.email, id: user._id };
  }

  async changePassword({ id, password }: any): Promise<any> {
    const hashPassword = await bcrypt.hash(password, 5);
    await this.userModel.findByIdAndUpdate(id, { password: hashPassword });
    return { message: 'Password successfully changed' };
  }
}
