import { IUser, UserModel, BotModel } from '.'

class DataBase {
	async createUser(сandidate: IUser) {
		const target = await UserModel.findOne({
			chat_id: сandidate.chat_id,
		})

		if (target) {
			return target
		}

		const user = await UserModel.create({ ...сandidate })

		if (!user) {
			throw new Error('Не удалось создать пользователя')
		}

		return user
	}

	async incrementToUse(nameBot: string, userId: number) {
		const bot = await BotModel.findOne({ name: nameBot })

		if (!bot) {
			throw new Error('Не удалось найти бота')
		}

		if (bot.quantity === undefined) {
			throw new Error('Количество использований не определено')
		}

		const user = await UserModel.findOne({ chat_id: userId })

		if (!user) {
			throw new Error('Не удалось найти Пользователя')
		}

		if (!user.quantity === undefined) {
			throw new Error('Не удалось найти Пользователя')
		}

		const resUpdateBot = await BotModel.updateOne(
			{ name: nameBot },
			{ quantity: bot.quantity + 1 },
		)

		if (!resUpdateBot) {
			throw new Error('Не удалось обновить бота')
		}

		const resUpdateUser = await UserModel.updateOne(
			{ chat_id: userId },
			{ quantity: user.quantity + 1 },
		)

		if (!resUpdateUser) {
			throw new Error('Не удалось обновить Пользователя')
		}

		return [resUpdateBot, resUpdateUser]
	}

	async getQuantityUsage() {
		const bot = (await BotModel.find())[0]

		if (!bot) {
			throw new Error('Не удалось найти бота')
		}

		if (bot.quantity === undefined) {
			throw new Error('Количество использований не определено')
		}

		const quantity: number = bot.quantity

		return quantity
	}

	async getNumUsers() {
		const users = await UserModel.find().count()

		if (users === undefined) {
			throw new Error('Не удалось получить количество пользователей')
		}

		return users
	}

	async createBot(nameBot: string) {
		const target = await BotModel.findOne({ name: nameBot })

		if (target) {
			return target
		}

		const bot = await BotModel.create({ name: nameBot })

		if (!bot) {
			throw new Error('Не удалось создать бота')
		}

		return bot
	}
}

export const DataBaseService = new DataBase()
