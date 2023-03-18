export const getResponseMessage = (ctx: any) => {
  const { first_name, last_name, username } = ctx.update.message.from;

  const user =
    first_name && last_name ? `${first_name} ${last_name}` : username;

  const response_message = `
  <strong>Hello, ${user} ✌, welcome to Script Shop&#8482</strong> \n \n <i>This is a test store for TG where you can create demo \n products or try to buy it.</i> \n <b>Click on the left button to open the store</b> \n \n <i>To manage the store, you can use the control panel.</i> \n <b>Press the right button to open the panel</b> \n \n <b>If you interested in my shop, pls contact developer <a href="https://t.me/script696">script696</a></b>
  `;
  return response_message;
};
