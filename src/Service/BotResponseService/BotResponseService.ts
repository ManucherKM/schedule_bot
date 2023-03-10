import {
	Commands,
	InitialBot,
	Stickers,
	Subdivision,
	Сourses,
} from '../../Config/enums'
import { ExcelController } from '../../Controller/ExcelController/ExcelController'
import { ScheduleUrlController } from '../../Controller/ScheduleUrlController/ScheduleUrlController'
import { ColumnHelper } from '../../Helpers/ColumnHelper/ColumnHelper'
import { GroupNameHelper } from '../../Helpers/GroupNameHelper/GroupNameHelper'
import { ScheduleMessageHelper } from '../../Helpers/ScheduleMessageHelper/ScheduleMessageHelper'
import { scheduleKeyboard, startKeyboard, startKeyboardAdmin } from './Buttons'
import {
	IGetScheduleInfo,
	IUser,
	Message,
	TelegramApi,
} from '../../Types/types'

class BotResponse {
	private getScheduleInfo = { urlSchedule: '' } as IGetScheduleInfo

	async start(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		const userInfo = {} as IUser

		// if (!user) {
		// 	if (msg.from?.first_name) {
		// 		userInfo.tgId = msg.from?.first_name
		// 	}

		// 	userInfo.chatId = msg.chat.id
		// }

		// userInfo.

		const sticker = Stickers.сute

		// const message = `Привет, ${userName} 👋\n\nС помощью данного бота ты можешь быстро и комфортно просматривать расписание занятий 015-й группы.\n\nЧтобы посмотреть расписание\nнажми на кнопку "${Commands.getSchedule}"`
		const message = `Привет"`

		await bot.sendSticker(chatId, sticker)

		await bot.sendMessage(chatId, message, {
			...startKeyboard,
			parse_mode: 'HTML',
			disable_web_page_preview: true,
		})
	}

	async getSchedule(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		// Временное решение
		// const target = {
		// 	chat_id: chatId,
		// 	tg_id: msg.chat.username,
		// 	name: msg.chat.first_name,
		// } as IUser

		const userId = msg.chat.id

		const messages = {
			loading_request: 'Обработка запроса ⏳',
			response_formation: 'Формирование ответа ⏳',
			responses: [],
		}

		const { message_id } = await bot.sendMessage(
			chatId,
			messages.loading_request,
		)

		const urlToFileSchedule = await ScheduleUrlController.getUrl(
			Subdivision.SP4,
		)

		const isSimilarUrls = this.getScheduleInfo.urlSchedule === urlToFileSchedule

		const isStringUrl = urlToFileSchedule !== undefined

		//При первом запросе к боту вседа скачиваем Excel файл
		if (!this.getScheduleInfo.urlSchedule && isStringUrl) {
			this.getScheduleInfo.urlSchedule = urlToFileSchedule
			var pathToFileSchedule = await ExcelController.getExcel(urlToFileSchedule)
		}
		// При повторных запросах проверяем был ли у нас уже такой файл с журналом
		else if (isSimilarUrls) {
			this.getScheduleInfo.urlSchedule = urlToFileSchedule
			var pathToFileSchedule: string | boolean =
				ExcelController.getPathToSchedule()
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
			search.group,
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
	}

	async error(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		const sticker = Stickers.panic
		const message = 'Что-то пошло не так...'

		await bot.sendSticker(chatId, sticker)
		await bot.sendMessage(chatId, message, startKeyboard)
	}

	async notFound(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id
		const message = 'Похоже что вы ошиблись командой.'

		await bot.sendMessage(chatId, message)
	}

	async home(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id
		const message = 'Меню'

		// if (chatId === InitialBot.admin) {
		// 	await bot.sendMessage(chatId, message, startKeyboardAdmin)
		// 	return
		// }

		await bot.sendMessage(chatId, message, startKeyboard)
	}

	async getStatistics(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		// const message = `Количество пользователей: <b>${users}</b>\nКоличество использований: <b>${quantityUsage}</b>`

		// await bot.sendMessage(chatId, message, {
		// 	...startKeyboardAdmin,
		// 	parse_mode: 'HTML',
		// })
	}

	async getInfo(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id
		const message =
			'Бот собирает некоторые данные пользователей для формирования статистики\n\nИсходный код бота можно посмотреть 👉 <a href="https://github.com/ManucherKM/schedule_bot">тут</a>'

		await bot.sendMessage(chatId, message, {
			...startKeyboard,
			parse_mode: 'HTML',
			disable_web_page_preview: true,
		})
	}

	// async profile(bot: TelegramApi, msg: Message) {
	// 	const chatId = msg.chat.id
	// 	const message = 'Профиль'

	// 	await bot.sendMessage(chatId, message)
	// }
}

export const BotResponseService = new BotResponse()
