import { Markup } from 'telegraf';

export const actionButtons = (url) => {
  return Markup.inlineKeyboard([Markup.button.webApp('open', url, false)]);
};
