import { Module } from '@nestjs/common';
import { AppUpdate } from './telegram.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AppUpdate],
  exports: [],
})
export class TelegramModule {}
