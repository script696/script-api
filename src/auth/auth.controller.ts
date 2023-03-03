import {
  Body,
  Controller,
  Get,
  Post,
  Put,
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
import { LoginResponse } from './response/LoginResponse';
import { RegistrationResponse } from './response/RegistrationResponse';
import { RegistrationDto } from './dto/RegistrationDto';
import { RefreshResponse } from './response/RefreshResponse';

@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async registration(
    @Body() body: RegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RegistrationResponse> {
    const user = await this.userService.register(body);

    const { accessToken, refreshToken } = await this.authService.login(user);

    response.cookie(REFRESH_TOKEN, refreshToken, COOKIE_CONFIG);

    return { accessToken, userId: user.id };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    response.cookie(REFRESH_TOKEN, refreshToken, COOKIE_CONFIG);

    return { accessToken, userId: req.user.id };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refresh(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RefreshResponse> {
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.user,
    );

    response.cookie(REFRESH_TOKEN, refreshToken, COOKIE_CONFIG);

    return { accessToken };
  }

  @Post('/sign-out')
  logout(@Res({ passthrough: true }) response: Response): { message: string } {
    response.clearCookie(REFRESH_TOKEN);
    return { message: 'Success logout' };
  }

  @UseGuards(LocalAuthGuard)
  @Put('/changePassword')
  async changePassword(@Request() req, @Body() body: any) {
    const res = await this.userService.changePassword({
      id: req.user.id,
      password: body.newPassword,
    });

    return res;
  }
}
