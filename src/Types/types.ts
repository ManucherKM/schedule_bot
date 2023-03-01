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

interface IGetScheduleInfo {
	urlToSchedule: string
}

interface IUser {
	name: string
	tg_id: string
	chat_id: number
}

interface IBot {
	name: string
	quantity: number
}

export {
	SendMessageOptions,
	IGetScheduleInfo,
	IColumnHelper,
	TelegramApi,
	CellValue,
	Message,
	IUser,
	IBot,
	IDay,
}
