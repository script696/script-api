import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../tokenService/token.service';
import {
  LoginServiceParams,
  LoginServiceResponse,
  RefreshResponse,
  RefreshServiceParams,
  ValidateUserResponse,
} from './types/auth.typedef';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserResponse> {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordsEqual = await bcrypt.compare(
      password,
      user?.password ?? '',
    );

    if (user && isPasswordsEqual) {
      const { username, email, _id } = user;
      return { username, email, id: _id };
    }
    return null;
  }

  async login(user: LoginServiceParams): Promise<LoginServiceResponse> {
    const payload = { email: user.email, sub: user.id };
    const tokens = await this.tokenService.getTokens(payload);

    return tokens;
  }

  async refresh(payload: RefreshServiceParams): Promise<RefreshResponse> {
    const tokens = await this.tokenService.getTokens({
      email: payload.email,
      sub: payload.sub,
    });
    return tokens;
  }
}
