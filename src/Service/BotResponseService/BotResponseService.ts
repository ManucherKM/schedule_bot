import { ScheduleMessageHelper } from "../../Helpers/ScheduleMessageHelper/ScheduleMessageHelper";
import {
  TelegramApi,
  Message,
  startKeyboard,
  scheduleKeyboard,
  ExcelController,
  ColumnHelper,
} from "./index";

class BotResponse {
  async start(bot: TelegramApi, msg: Message) {
    const chatId = msg.chat.id;

    const sticker =
      "https://cdn.tlgrm.app/stickers/065/642/065642f8-a0e9-4d2e-bb64-185f4d1c445d/192/4.webp";

    const message = "Привет";

    await bot.sendSticker(chatId, sticker);
    await bot.sendMessage(chatId, message, startKeyboard);
  }

  async getSchedule(bot: TelegramApi, msg: Message) {
    const chatId = msg.chat.id;

    const messages = {
      loading_request: "Обработка запроса ⏳",
      response_formation: "Формирование ответа ⏳",
      responses: [],
    };

    const { message_id } = await bot.sendMessage(
      chatId,
      messages.loading_request
    );

    const urlToFileSchedule = process.env.URL_SCHEDULE;

    const pathToFileSchedule = await ExcelController.getExcel(
      urlToFileSchedule
    );

    if (!pathToFileSchedule) {
      throw new Error("Неверный путь до файла журнала");
    }

    const search = {
      course: "3 курс",
      group: "15",
    };

    const content = await ExcelController.getColumn(
      pathToFileSchedule,
      search.course,
      search.group
    );

    await bot.editMessageText(messages.response_formation, {
      message_id,
      chat_id: chatId,
    });

    const formatContent = ColumnHelper(content);

    let messageInfo = `<b>Группа:</b> ${formatContent.group}.\n<b>Специальность:</b> ${formatContent.nameGroup}.`;

    await bot.editMessageText(messageInfo, {
      message_id,
      chat_id: chatId,
      parse_mode: "HTML",
    });

    let messageSchedule = ScheduleMessageHelper(formatContent);

    // for (let i = 0; i < formatContent.info.length; i++) {
    //   const dayInfo = formatContent.info[i];

    //   let day = `\n\n<b>${dayInfo.name}</b>`;

    //   if (dayInfo.schedule.length === 0) {
    //     day += "\nНа этот день пар нет.";
    //     messageSchedule += day;

    //     continue;
    //   }

    //   for (const pair of dayInfo.schedule) {
    //     day += `\n${pair}`;
    //   }

    //   messageSchedule += day;
    // }

    await bot.sendMessage(chatId, messageSchedule, {
      ...scheduleKeyboard,
      parse_mode: "HTML",
    });

    const isFileRemoved = await ExcelController.removeExcel(pathToFileSchedule);

    if (!isFileRemoved) {
      console.log("Не удалось удалить файл с журналом");
    }
  }

  async error(bot: TelegramApi, msg: Message) {
    const chatId = msg.chat.id;
    const message = "Что-то пошло не так...";

    await bot.sendMessage(chatId, message, startKeyboard);
  }

  async profile(bot: TelegramApi, msg: Message) {
    const chatId = msg.chat.id;
    const message = "Профиль";

    await bot.sendMessage(chatId, message);
  }

  async notFound(bot: TelegramApi, msg: Message) {
    const chatId = msg.chat.id;
    const message = "Похоже что вы ошиблись командой.";

    await bot.sendMessage(chatId, message);
  }

  async home(bot: TelegramApi, msg: Message) {
    const chatId = msg.chat.id;
    const message = "Меню";

    await bot.sendMessage(chatId, message, startKeyboard);
  }
}

export const BotResponseService = new BotResponse();
