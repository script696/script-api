import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) // private jwtService: JwtService,
  // private configService: ConfigService,
  {}

  async getAllUsers() {
    const allUsers = await this.userModel.find();
    return allUsers;
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async register({ username, email, password, role }) {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с таким ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 5);

    await this.userModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    return { username, email };
  }

  // async getTokens(userId: string, username: string) {
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(
  //       {
  //         sub: userId,
  //         username,
  //       },
  //       {
  //         secret: 'ACCESS_SECRET',
  //         expiresIn: '15m',
  //       },
  //     ),
  //     this.jwtService.signAsync(
  //       {
  //         sub: userId,
  //         username,
  //       },
  //       {
  //         secret: 'REFRESH_SERVICE',
  //         expiresIn: '7d',
  //       },
  //     ),
  //   ]);
  //
  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }
}
