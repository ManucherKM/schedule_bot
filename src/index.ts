import {
	BotResponseController,
	Commands,
	config,
	DataBaseController,
	InitialBot,
	mongoose,
	TelegramApi,
	keepAlive,
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

	const DBBot = await DataBaseController.createBot(InitialBot.nameBot)

	if (!DBBot) {
		console.log('Не удалось записать бота в БД')
		return
	}

	const incomingMessages = {
		start: new RegExp(`${Commands.start}`),
		getSchedule: new RegExp(`${Commands.getSchedule}`),
		getStatistics: new RegExp(`${Commands.getStatistics}`),
		getInfo: new RegExp(`${Commands.getInfo}`),
		home: new RegExp(`${Commands.home}`),
	}

	// Start
	bot.onText(incomingMessages.start, async msg => {
		await BotResponseController.start(bot, msg)
	})

	// Schedule
	bot.onText(incomingMessages.getSchedule, async msg => {
		await BotResponseController.getSchedule(bot, msg)
	})

	// Info
	bot.onText(incomingMessages.getInfo, async msg => {
		await BotResponseController.getInfo(bot, msg)
	})

	// Statistics
	bot.onText(incomingMessages.getStatistics, async msg => {
		const chatId = msg.chat.id

		if (chatId !== InitialBot.admin) return

		await BotResponseController.getStatistics(bot, msg)
	})

	// Home
	bot.onText(incomingMessages.home, async msg => {
		await BotResponseController.home(bot, msg)
	})

	// Other
	bot.on('message', async msg => {
		const text = msg.text

		const isOther =
			!text?.match(incomingMessages.getInfo) &&
			!text?.match(incomingMessages.getSchedule) &&
			!text?.match(incomingMessages.getStatistics) &&
			!text?.match(incomingMessages.home) &&
			!text?.match(incomingMessages.start)

		if (isOther) {
			await BotResponseController.notFound(bot, msg)
		}
	})
})()

keepAlive()
