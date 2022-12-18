import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async getTokens(payload: { email: string; sub: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15s',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
