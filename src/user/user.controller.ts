import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
// import { Request } from 'express';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/all')
  async getAllUsers(@Req() request: Request) {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Get('/getUser')
  async getTest(@Request() req) {
    const id = req.user.sub;
    return await this.userService.getUserById(id);
  }
}
