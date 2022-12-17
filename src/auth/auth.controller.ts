import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth-guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

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
  login(@Request() req) {
    return this.authService.login(req.user);
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
