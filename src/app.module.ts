import * as path from 'path';
import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { TokenModule } from './tokenService/token.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramModule } from './telegram/telegram.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`),
    TokenModule,
    UserModule,
    TrackModule,
    FileModule,
    AuthModule,
    TelegramModule,
    ProductModule,
  ],
})
export class AppModule {}
