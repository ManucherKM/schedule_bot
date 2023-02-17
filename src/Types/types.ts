import type { CellValue } from 'exceljs'
import type TelegramApi from 'node-telegram-bot-api'
import type { Message } from 'node-telegram-bot-api'
import type { SendMessageOptions } from 'node-telegram-bot-api'

interface IDay {
	name: string
	schedule: string[]
}

interface IColumnHelper<T> {
	group: T
	nameGroup: T
	info: IDay[]
}

export {
	SendMessageOptions,
	IColumnHelper,
	TelegramApi,
	CellValue,
	Message,
	IDay,
}
