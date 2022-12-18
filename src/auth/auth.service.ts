import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../tokenService/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService, // private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (user && isPasswordsEqual) {
      const { username, email } = user;
      return { username, email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    const tokens = await this.tokenService.getTokens(user.userId, user.email);

    console.log(tokens);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
