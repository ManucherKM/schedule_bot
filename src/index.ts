import { BotResponseController, Commands, TelegramApi, config } from "./barrel";
config();

const TOKEN = process.env.TOKEN;

(() => {
  if (!TOKEN) {
    console.log("Токен бота не найден");
    return;
  }

  const params = { polling: true };

  const bot = new TelegramApi(TOKEN, params);

  const incomingMessages = {
    start: new RegExp(`${Commands.start}`),
    getSchedule: new RegExp(`${Commands.getSchedule}`),
    home: new RegExp(`${Commands.home}`),
  };

  // Start
  bot.onText(incomingMessages.start, async (msg) => {
    await BotResponseController.start(bot, msg);
  });

  // Schedule
  bot.onText(incomingMessages.getSchedule, async (msg) => {
    await BotResponseController.getSchedule(bot, msg);
  });

  // Home
  bot.onText(incomingMessages.home, async (msg) => {
    await BotResponseController.home(bot, msg);
  });
})();
