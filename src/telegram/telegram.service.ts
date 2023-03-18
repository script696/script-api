import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { actionButtons } from './markup/app.buttons';
import { getResponseMessage } from './heplers/getResponseMessage';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot('cat') private catBot: Telegraf<Context>,
    private configService: ConfigService,
  ) {}

  appUrl = this.configService.get('TELEGRAM_URL');
  userId = this.configService.get('USER_ID');

  @Start()
  async startCommand(ctx: Context) {
    const responseMsg = getResponseMessage(ctx);
    const appUrl = `${this.appUrl}?userId=${this.userId}`;
    await ctx.replyWithHTML(responseMsg, actionButtons(appUrl));
  }
}
