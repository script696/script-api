import { Markup } from 'telegraf';

const URL = 'https://f1ae-94-19-44-138.eu.ngrok.io';

export const actionButtons = (url) => {
  return Markup.inlineKeyboard([Markup.button.webApp('open', url, false)]);
};
