import { Markup } from 'telegraf';

export const actionButtons = (url) => {
  return Markup.inlineKeyboard([
    Markup.button.webApp('Open Shop', url, false),
    Markup.button.url('Open Dashboard ⚙', 'http://script-panel.ru', false),
  ]);
};
