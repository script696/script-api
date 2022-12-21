import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/all')
  async getAllUsers(@Req() request: Request) {
    return await this.userService.getAllUsers();
  }
}
