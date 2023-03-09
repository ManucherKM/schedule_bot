import {
	TelegramApi,
	SendMessageOptions,
	EditMessageTextOptions,
} from '../../Types/types'

type CustomEditMessageTextOptions = Omit<
	EditMessageTextOptions,
	'chat_id' | 'message_id'
>

export async function EditMessageHelper(
	bot: TelegramApi,
	chatId: number,
	msg: string,
	options?: SendMessageOptions,
) {
	const { message_id } = await bot.sendMessage(chatId, msg, options)

	return async function (msg: string, options?: CustomEditMessageTextOptions) {
		await bot.editMessageText(msg, {
			chat_id: chatId,
			message_id,
			...options,
		})
	}
}
