import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { actionButtons } from './markup/app.buttons';

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
    const test = '## Hello!';
    const appUrl = `${this.appUrl}?userId=${this.userId}`;
    await ctx.reply(
      'Please tap the left below button to open the shop or right button to open dashboard!',
      actionButtons(appUrl),
    );
    // ctx.reply(test, {
    //   parse_mode: 'MarkdownV2',
    //   reply_markup: {
    //     inline_keyboard: [
    //       [
    //         { text: 'Button 1', callback_data: 'btn-1' },
    //         { text: 'Button 2', callback_data: 'btn-2' },
    //       ],
    //
    //       [{ text: 'Next', callback_data: 'next' }],
    //       [{ text: 'Open in browser', url: 'telegraf.js.org' }],
    //     ],
    //   },
    // });
  }
}
