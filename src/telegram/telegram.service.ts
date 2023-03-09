import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from './markup/app.buttons';
import { ConfigService } from '@nestjs/config';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private configService: ConfigService,
  ) {}

  appUrl = this.configService.get('TELEGRAM_URL');
  userId = this.configService.get('USER_ID');

  @Start()
  async startCommand(ctx: Context) {
    const appUrl = `${this.appUrl}?userId=${this.userId}`;
    await ctx.reply('One', actionButtons(appUrl));
  }
}
