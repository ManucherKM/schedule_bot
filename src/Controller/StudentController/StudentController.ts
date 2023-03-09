import { StudentService } from '../../Service/StudentService/StudentService'
import { Message, TelegramApi, IStudent } from '../../Types/types'

type OptionalIStudent = Partial<IStudent>

class Student {
	async createStudent(target: IStudent) {
		try {
			if (!target) {
				console.log('Не удалось получить параметры студента')
				return
			}

			const res = await StudentService.createStudent(target)

			return res
		} catch (e) {
			console.log(e)
		}
	}

	async updateStudent(chatId: number, update: OptionalIStudent) {
		try {
			if (!chatId || !update) {
				console.log('Не удалось найти id чата или параметры с обновлениями')
			}

			const res = await StudentService.updateStudent(chatId, update)

			return res
		} catch (e) {
			console.log(e)
		}
	}

	async removeStudent(chatId: number) {
		try {
			if (!chatId) {
				console.log('Не удалось найти id чата')
				return
			}

			const res = await StudentService.removeStudent(chatId)

			return res
		} catch (e) {
			console.log(e)
		}
	}

	async getProfile(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не удалось найти объект бота или сообщения')
				return
			}

			await StudentService.getProfile(bot, msg)
		} catch (e) {
			console.log(e)
		}
	}

	async getCoupleSchedule(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не удалось найти объект бота или сообщения')
				return
			}

			await StudentService.getCoupleSchedule(bot, msg)
		} catch (e) {
			console.log(e)
		}
	}

	async getRatings(bot: TelegramApi, msg: Message, target: IStudent) {
		try {
			if (!bot || !msg || !target) {
				console.log('Аргументы функции переданы некорректно')
				return
			}

			await StudentService.getRatings(bot, msg, target)
		} catch (e) {
			console.log(e)
		}
	}

	async getTeacherSchedule(bot: TelegramApi, msg: Message, target: IStudent) {
		try {
			if (!bot || !msg || !target) {
				console.log('Аргументы функции переданы некорректно')
				return
			}

			await StudentService.getTeacherSchedule(bot, msg, target)
		} catch (e) {
			console.log(e)
		}
	}

	async getBellSchedule(bot: TelegramApi, msg: Message, target: IStudent) {
		try {
			if (!bot || !msg || !target) {
				console.log('Аргументы функции переданы некорректно')
				return
			}

			await StudentService.getBellSchedule(bot, msg, target)
		} catch (e) {
			console.log(e)
		}
	}

	async getHelp(bot: TelegramApi, msg: Message, target: IStudent) {
		try {
			if (!bot || !msg || !target) {
				console.log('Аргументы функции переданы некорректно')
				return
			}

			await StudentService.getHelp(bot, msg, target)
		} catch (e) {
			console.log(e)
		}
	}
}

export const StudentController = new Student()
