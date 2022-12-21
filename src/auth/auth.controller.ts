import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth-guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { COOKIE_CONFIG, REFRESH_TOKEN } from './constants';

@Controller('/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async registration(
    @Body() body,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.register(body);

    const { accessToken, refreshToken } = await this.authService.login(user);

    response.cookie(REFRESH_TOKEN, refreshToken, COOKIE_CONFIG);

    return { accessToken };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    response.cookie(REFRESH_TOKEN, refreshToken, COOKIE_CONFIG);

    return { accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refresh(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.user,
    );

    response.cookie(REFRESH_TOKEN, refreshToken, COOKIE_CONFIG);

    return { accessToken };
  }

  @Get('/signout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(REFRESH_TOKEN);
    return { response: 'Success logout' };
  }
}
