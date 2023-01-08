import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { Request } from 'express';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
  async getUser(@Request() req) {
    const id = req.user.sub;
    return await this.userService.getUserById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/updateUser')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  async updateUser(@UploadedFiles() files, @Body() body: any, @Request() req) {
    const id = req.user.sub;
    const avatar = files?.avatar ? files?.avatar[0] : null;
    return await this.userService.updateUser(id, body, avatar);
  }
}
