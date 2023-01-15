import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Put,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { UpdateUserDto } from './dto/updateUserDto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(
    @Body() body: UpdateUserDto,
    @Request() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build({ fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ) {
    const id = req.user.sub;

    return await this.userService.updateUser(id, body, file);
  }
}
