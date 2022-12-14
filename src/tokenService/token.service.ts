import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokensParams, GetTokensResponse } from './types/token.typedef';

const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async getTokens(payload: GetTokensParams): Promise<GetTokensResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '15d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
