import type { Message, SendMessageOptions } from 'node-telegram-bot-api'
import type { CellValue } from 'exceljs'
import type { ObjectId } from 'mongoose'
import type TelegramApi from 'node-telegram-bot-api'

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
	urlSchedule: string
}

interface IUser {
	name: string
	tg_id: string
	chat_id: number
	quantity: number
}

interface IBot {
	name: string
	quantity?: 0
	users?: ObjectId
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
