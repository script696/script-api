import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { REFRESH_TOKEN } from '../auth/constants';

const getCookie = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[REFRESH_TOKEN];
  }
  return token;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([getCookie]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    return payload;
  }
}
