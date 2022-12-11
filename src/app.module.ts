import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/script-api'),
    TrackModule,
  ],
})
export class AppModule {}
