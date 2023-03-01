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
	async incrementToUse() {
		try {
		} catch (e) {
			console.log(e)
		}
	}
	async getQuantityUsage() {
		try {
		} catch (e) {
			console.log(e)
		}
	}
	async getNumUsers(): Promise<number | undefined> {
		try {
			const res: number = await DataBaseService.getNumUsers()

			if (!res) {
				return 0
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}
	async createBot() {
		try {
			const res = await DataBaseService.createBot()

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
