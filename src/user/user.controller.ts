import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../guards/local-auth-guard';

@Controller('/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async registration(@Body() body) {
    return await this.userService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  login(@Request() req) {
    console.log(req.user);
    return req.user;
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
