import type {
	Message,
	SendMessageOptions,
	EditMessageTextOptions,
} from 'node-telegram-bot-api'
import type { CellValue } from 'exceljs'
import type { ObjectId } from 'mongoose'
import type TelegramApi from 'node-telegram-bot-api'
import { Roles, Subdivision } from '../Config/enums'

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
	chatId: number
	role: Roles
	subdivision: Subdivision
	tgId?: string
	activity?: {}
}

interface IAdmin extends IUser {}

interface IStudent extends IUser {
	group: string
	keySchedule?: string
}

interface ITeacher extends IUser {
	firstName: string
	lastName: string
	patronymic: string
}

interface IBot {
	name: string
	quantity?: 0
	users?: ObjectId
}

export {
	EditMessageTextOptions,
	SendMessageOptions,
	IGetScheduleInfo,
	IColumnHelper,
	TelegramApi,
	CellValue,
	ITeacher,
	IStudent,
	Message,
	IAdmin,
	IUser,
	IBot,
	IDay,
}
