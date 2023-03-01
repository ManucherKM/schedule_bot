import { IUser, UserModel, BotModel } from '.'

class DataBase {
	async createUser(сandidate: IUser) {
		const target = await UserModel.findOne({
			chat_id: сandidate.chat_id,
		})

		if (target) {
			return
		}

		const user = await UserModel.create({ ...сandidate })

		if (!user) {
			throw new Error('Не удалось создать пользователя')
		}

		return user
	}
	async incrementToUse() {}
	async getQuantityUsage(): Promise<number> {
		const bot = (await BotModel.find())[0]

		if (!bot) {
			throw new Error('Не удалось найти бота')
		}

		const quantity: number = bot.quantity

		return quantity
	}
	async getNumUsers(): Promise<number> {
		const users = await UserModel.find().count()

		return users
	}
	async createBot() {}
}

export const DataBaseService = new DataBase()
