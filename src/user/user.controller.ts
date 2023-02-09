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
import { UpdateBasicAdminInfoDto } from './dto/UpdateBasicAdminInfoDto';
import { UpdateAddressAdminInfoDto } from './dto/UpdateAddressAdminInfoDto';

@Controller('/admin')
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

    return await this.userService.updateUser(id, body);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/updateBasicInfo')
  async updateBasicInfo(@Body() body: UpdateBasicAdminInfoDto, @Request() req) {
    const id = req.user.sub;

    return await this.userService.updateBasicInfo(id, body);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/updateAddressInfo')
  async updateAddressInfo(
    @Body() body: UpdateAddressAdminInfoDto,
    @Request() req,
  ) {
    const id = req.user.sub;

    return await this.userService.updateAddressInfo(id, body);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/updateAvatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUserAvatar(
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
    console.log(file);
    const id = req.user.sub;

    return await this.userService.updateUserAvatar(id, file);
  }
}
