import {
	BotResponseController,
	Commands,
	config,
	mongoose,
	TelegramApi
} from './barrel'
import { Roles, Subdivision } from './Config/enums'
import { StudentController } from './Controller'

config()

const TOKEN = process.env.TOKEN
const DB_URL = process.env.DB_URL

const start = async () => {
	if (!TOKEN || !DB_URL) {
		console.log('Не удалось найти токен бота или URL от БД')
		return
	}

	await mongoose
		.connect(DB_URL)
		.then(() => {
			console.log('Подключение к БД прошло успешно')
		})
		.catch(e => console.log('Не удалось подключиться к БД\n\n', e))

	const incomingMessages = {
		getTeacherSchedule: new RegExp(`${Commands.getTeacherSchedule}`),
		getCoupleSchedule: new RegExp(`${Commands.getCoupleSchedule}`),
		getFreeCabinets: new RegExp(`${Commands.getFreeCabinets}`),
		getBellSchedule: new RegExp(`${Commands.getBellSchedule}`),
		sendNewsletter: new RegExp(`${Commands.sendNewsletter}`),
		getStatistics: new RegExp(`${Commands.getStatistics}`),
		getProfile: new RegExp(`${Commands.getProfile}`),
		getRatings: new RegExp(`${Commands.getRatings}`),
		getHelp: new RegExp(`${Commands.getHelp}`),
		start: new RegExp(`${Commands.start}`),
		back: new RegExp(`${Commands.back}`),
	}

	const params = { polling: true }

	const bot = new TelegramApi(TOKEN, params)

	// Start
	bot.onText(incomingMessages.start, async msg => {})

	// Teacher schedule
	bot.onText(incomingMessages.getTeacherSchedule, async msg => {})

	// Bell schedule
	bot.onText(incomingMessages.getBellSchedule, async msg => {})

	// Free cabinets
	bot.onText(incomingMessages.getFreeCabinets, async msg => {})

	// Statistics
	bot.onText(incomingMessages.getStatistics, async msg => {})

	// Couple schedule
	bot.onText(incomingMessages.getCoupleSchedule, async msg => {})

	// Send Newsletter
	bot.onText(incomingMessages.sendNewsletter, async msg => {})

	// Ratings
	bot.onText(incomingMessages.getRatings, async msg => {})

	// Profile
	bot.onText(incomingMessages.getProfile, async msg => {
		await StudentController.getProfile(bot, msg)
	})

	// Help
	bot.onText(incomingMessages.getHelp, async msg => {})

	// Back
	bot.onText(incomingMessages.back, async msg => {})

	// Unknown command
	bot.on('message', async msg => {
		const text = msg.text

		const isOther =
			!text?.match(incomingMessages.getTeacherSchedule) &&
			!text?.match(incomingMessages.getCoupleSchedule) &&
			!text?.match(incomingMessages.getBellSchedule) &&
			!text?.match(incomingMessages.getFreeCabinets) &&
			!text?.match(incomingMessages.sendNewsletter) &&
			!text?.match(incomingMessages.getStatistics) &&
			!text?.match(incomingMessages.getProfile) &&
			!text?.match(incomingMessages.getRatings) &&
			!text?.match(incomingMessages.getHelp) &&
			!text?.match(incomingMessages.start)

		if (isOther) {
			await BotResponseController.notFound(bot, msg)
		}
	})
}

start()
;(async () => {
	if (!DB_URL) return

	await mongoose
		.connect(DB_URL)
		.then(() => {
			console.log('Подключение к БД прошло успешно')
		})
		.catch(e => console.log('Не удалось подключиться к БД\n\n', e))

	const student = {
		group: '015',
		tgId: '123',
		chatId: 6260907059,
		role: Roles.student,
		subdivision: Subdivision.SP4,
	}

	const newStudent = await StudentController.createStudent(student)

	if (!newStudent) return

	const update = await StudentController.updateStudent(newStudent.chatId, {
		group: '21345678',
	})

	// const remove = await StudentController.removeStudent(newStudent.chatId)
	// console.log('Remove', remove)
})()
