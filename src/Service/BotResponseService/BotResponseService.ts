import {
	ScheduleMessageHelper,
	ScheduleUrlController,
	IGetScheduleInfo,
	scheduleKeyboard,
	ExcelController,
	GroupNameHelper,
	startKeyboard,
	ColumnHelper,
	TelegramApi,
	Commands,
	Message,
	Сourses,
	Stickers,
} from './index'

class BotResponse {
	private getScheduleInfo = { urlToSchedule: '' } as IGetScheduleInfo

	async start(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id
		const userName = msg.from?.first_name

		const sticker = Stickers.сute

		const message = `Привет, ${userName} 👋\n\nС помощью данного бота ты можешь быстро и комфортно просматривать расписание занятий 015-й группы.\n\nЧтобы посмотреть расписание\nнажми на кнопку "${Commands.getSchedule}"\n\nИсходный код бота можно посмотреть <a href="https://github.com/ManucherKM/schedule_bot">тут</a>`

		await bot.sendSticker(chatId, sticker)
		await bot.sendMessage(chatId, message, {
			...startKeyboard,
			parse_mode: 'HTML',
			disable_web_page_preview: true,
		})
	}

	async getSchedule(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		const messages = {
			loading_request: 'Обработка запроса ⏳',
			response_formation: 'Формирование ответа ⏳',
			responses: [],
		}

		const { message_id } = await bot.sendMessage(
			chatId,
			messages.loading_request
		)

		const urlToFileSchedule = await ScheduleUrlController.getUrl()

		const isSimilarUrls =
			this.getScheduleInfo.urlToSchedule === urlToFileSchedule

		const isStringUrl = urlToFileSchedule !== undefined

		//При первом запуске бота вседа скачиваем Excel файл
		if (!this.getScheduleInfo.urlToSchedule && isStringUrl) {
			this.getScheduleInfo.urlToSchedule = urlToFileSchedule
			var pathToFileSchedule = await ExcelController.getExcel(urlToFileSchedule)
		}

		// При повторных запросах проверяем был ли у нас уже такой файл с журналом
		else if (isSimilarUrls) {
			this.getScheduleInfo.urlToSchedule = urlToFileSchedule
			var pathToFileSchedule = await ExcelController.getPathToSchedule()
		}
		// Если такого файла не было - заменяем предыдущий файл на новый
		else {
			var pathToFileSchedule = await ExcelController.getExcel(urlToFileSchedule)
		}

		if (!pathToFileSchedule) {
			throw new Error('Неверный путь до файла журнала')
		}

		const defaultGroup = '015'

		const group = GroupNameHelper(defaultGroup)
		const course = Сourses.third

		const search = {
			course,
			group,
		}

		const content = await ExcelController.getColumn(
			pathToFileSchedule,
			search.course,
			search.group
		)

		await bot.editMessageText(messages.response_formation, {
			message_id,
			chat_id: chatId,
		})

		const formatContent = ColumnHelper(content)

		let messageInfo = `<b>Группа:</b> ${defaultGroup}.\n<b>Специальность:</b> ${formatContent.nameGroup}.`

		await bot.editMessageText(messageInfo, {
			message_id,
			chat_id: chatId,
			parse_mode: 'HTML',
		})

		let messageSchedule = ScheduleMessageHelper(formatContent)

		await bot.sendMessage(chatId, messageSchedule, {
			...scheduleKeyboard,
			parse_mode: 'HTML',
		})

		// const isFileRemoved = await ExcelController.removeExcel(pathToFileSchedule);

		// if (!isFileRemoved) {
		//   console.log("Не удалось удалить файл с журналом");
		// }
	}

	async error(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		const sticker = Stickers.panic
		const message = 'Что-то пошло не так...'

		await bot.sendSticker(chatId, sticker)
		await bot.sendMessage(chatId, message, startKeyboard)
	}

	async profile(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id
		const message = 'Профиль'

		await bot.sendMessage(chatId, message)
	}

	async notFound(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id
		const message = 'Похоже что вы ошиблись командой.'

		await bot.sendMessage(chatId, message)
	}

	async home(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id
		const message = 'Меню'

		await bot.sendMessage(chatId, message, startKeyboard)
	}
}

export const BotResponseService = new BotResponse()
