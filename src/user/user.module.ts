import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Track, TrackSchema } from '../track/schemas/track.schema';
import { AuthModule } from '../auth/auth.module';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, FileService],
  exports: [UserService],
})
export class UserModule {}
