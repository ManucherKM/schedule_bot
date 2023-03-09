import { Message, TelegramApi, IStudent } from '../../Types/types'
import StudentModel from './Models/StudentModel'
import { SettingProfileKeyboard } from './Buttons'
import { EditMessageHelper } from '../../Helpers/EditMessageHelper/EditMessageHelper'
import { ScheduleUrlController } from '../../Controller'
import { Subdivision } from '../../Config/enums'

type OptionalIStudent = Partial<IStudent>

class Student {
	async createStudent(target: IStudent) {
		const checkStudent = await StudentModel.findOne({ chatId: target.chatId })

		if (checkStudent) {
			return checkStudent
		}

		const newStudent = await StudentModel.create(target)

		if (!newStudent) {
			throw new Error('Не удалось добавить студента в БД')
		}

		return newStudent
	}

	async updateStudent(chatId: number, update: OptionalIStudent) {
		const target = await StudentModel.findOne({ chatId })

		if (!target) {
			throw new Error('Не удалось найти пользователя')
		}

		const newStudent = await StudentModel.updateOne(
			{
				chatId,
			},
			{ ...update },
		)

		if (!newStudent) {
			throw new Error('Не удалось обновить пользователя')
		}

		return newStudent
	}

	async removeStudent(chatId: number) {
		const checkStudent = await StudentModel.findOne({ chatId })

		if (!checkStudent) {
			throw new Error('Не удалось найти пользователя')
		}

		const res = await StudentModel.deleteOne({ chatId })

		if (!res) {
			throw new Error('Не удалось удалить пользователя')
		}

		return res
	}

	async getProfile(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		const student = await StudentModel.findOne({ chatId })

		if (!student) {
			throw new Error('Не удалось найти студента')
		}

		let message = `<b>ID:</b> ${student.chatId}`

		if (student.tgId) {
			message += `\n<b>Имя пользователя:</b> ${student.tgId}`
		}

		message += `\n<b>Роль:</b> ${student.role}`

		message += `\n<b>Дата регистрации:</b> ${student.date.toLocaleDateString()}`

		message += `\n<b>Группа:</b> ${student.group}<b>:</b>`

		message += `\n<b>Подразделение:</b> ${student.subdivision}<b>:</b>`

		await bot.sendMessage(chatId, message, {
			...SettingProfileKeyboard,
			parse_mode: 'HTML',
		})
	}

	async getCoupleSchedule(bot: TelegramApi, msg: Message) {
		const chatId = msg.chat.id

		const EditMessage = await EditMessageHelper(
			bot,
			chatId,
			'⏳ Запрос принят, ожидайте ответа.',
		)

		const student = await StudentModel.findOne({ chatId })

		if (!student) {
			throw new Error('Не удалось найти студента')
		}

		let urlSchedule = await ScheduleUrlController.getUrl(Subdivision.SP4)

		EditMessage('Формирование ответа ⏳')
	}

	async getRatings(bot: TelegramApi, msg: Message, target: IStudent) {}

	async getTeacherSchedule(bot: TelegramApi, msg: Message, target: IStudent) {}

	async getBellSchedule(bot: TelegramApi, msg: Message, target: IStudent) {}

	async getHelp(bot: TelegramApi, msg: Message, target: IStudent) {}
}

export const StudentService = new Student()
