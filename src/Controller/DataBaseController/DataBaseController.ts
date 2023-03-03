import { DataBaseService, IUser } from '.'

class DataBase {
	async createUser(user: IUser) {
		try {
			if (!user) {
				console.log('Объект пользователя пустой')
				return
			}

			const res = await DataBaseService.createUser(user)

			if (!res) {
				console.log('Не удалось создать пользователя')
				return
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}

	async incrementToUse(nameBot: string, userId: number) {
		try {
			if (!nameBot || !userId) {
				console.log('Не удалось найти имя бота или идентификатор пользователя')
				return
			}

			const res = await DataBaseService.incrementToUse(nameBot, userId)

			if (!res) {
				console.log('Не удалось инкрементировать количество использований бота')
				return
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}

	async getQuantityUsage() {
		try {
			const res = await DataBaseService.getQuantityUsage()

			if (!res) {
				return
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}

	async getNumUsers() {
		try {
			const res = await DataBaseService.getNumUsers()

			if (!res) {
				return
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}

	async createBot(nameBot: string) {
		try {
			if (!nameBot) {
				console.log('Не удалось найти имя бота')
				return
			}

			const res = await DataBaseService.createBot(nameBot)

			if (!res) {
				return
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}
}

export const DataBaseController = new DataBase()
