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

  @Start()
  async startCommand(ctx: Context) {
    console.log(this.appUrl);
    await ctx.reply('One', actionButtons(this.appUrl));
  }
}
