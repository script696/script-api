import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth-guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async registration(@Body() body) {
    return await this.userService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    response.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      path: '/',
    });

    return { accessToken };
  }

  @Post('/signout')
  logout() {
    return;
  }

  @Post('/activate/:link')
  activation() {
    return;
  }
  @Post('/refresh')
  refresh() {
    return;
  }
}
