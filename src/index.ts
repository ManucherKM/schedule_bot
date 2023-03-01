import {
	BotResponseController,
	DataBaseController,
	TelegramApi,
	Commands,
	mongoose,
	config,
	IUser,
} from './barrel'

config()

const TOKEN = process.env.TOKEN
const DB_URL = process.env.DB_URL

;(async () => {
	if (!TOKEN) {
		console.log('Токен бота не найден')
		return
	}

	if (!DB_URL) {
		console.log('URL от БД не найден')
		return
	}

	await mongoose
		.connect(DB_URL)
		.then(() => {
			console.log('Подключение к БД прошло успешно')
		})
		.catch(e => console.log('Не удалось подключиться к БД\n\n', e))

	const params = { polling: true }

	const bot = new TelegramApi(TOKEN, params)

	await DataBaseController.

	const incomingMessages = {
		start: new RegExp(`${Commands.start}`),
		getSchedule: new RegExp(`${Commands.getSchedule}`),
		home: new RegExp(`${Commands.home}`),
	}

	// Start
	bot.onText(incomingMessages.start, async msg => {
		const user = {
			chat_id: msg.chat.id,
			tg_id: msg.chat.username,
			name: msg.chat.first_name,
		} as IUser

		await DataBaseController.createUser(user)

		await BotResponseController.start(bot, msg)
	})

	// Schedule
	bot.onText(incomingMessages.getSchedule, async msg => {
		await BotResponseController.getSchedule(bot, msg)
	})

	// Home
	bot.onText(incomingMessages.home, async msg => {
		await BotResponseController.home(bot, msg)
	})
})()
