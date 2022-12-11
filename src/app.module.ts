import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/script-api'),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
