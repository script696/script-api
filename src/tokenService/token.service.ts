import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'ACCESS_SECRET',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'REFRESH_SERVICE',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
