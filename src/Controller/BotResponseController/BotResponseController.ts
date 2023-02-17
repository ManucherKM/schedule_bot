import { BotResponseService, Message, TelegramApi } from './index'

class BotResponse {
	async start(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не найден бот или сообщение')
				return
			}

			await BotResponseService.start(bot, msg)
		} catch (e) {
			console.log(e)
			await this.error(bot, msg)
		}
	}

	async getSchedule(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не найден бот или сообщение')
				return
			}

			await BotResponseService.getSchedule(bot, msg)
		} catch (e) {
			console.log(e)
			await this.error(bot, msg)
		}
	}

	async error(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не найден бот или сообщение')
				return
			}

			await BotResponseService.error(bot, msg)
		} catch (e) {
			console.log(e)
		}
	}

	async profile(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не найден бот или сообщение')
				return
			}

			await BotResponseService.profile(bot, msg)
		} catch (e) {
			console.log(e)
			await this.error(bot, msg)
		}
	}

	async notFound(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не найден бот или сообщение')
				return
			}

			await BotResponseService.notFound(bot, msg)
		} catch (e) {
			console.log(e)
			await this.error(bot, msg)
		}
	}

	async home(bot: TelegramApi, msg: Message) {
		try {
			if (!bot || !msg) {
				console.log('Не найден бот или сообщение')
				return
			}

			await BotResponseService.home(bot, msg)
		} catch (e) {
			console.log(e)
			await this.error(bot, msg)
		}
	}
}

export const BotResponseController = new BotResponse()
