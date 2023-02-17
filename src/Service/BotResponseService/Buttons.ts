import { Commands } from '../../Config/enums'
import { SendMessageOptions } from './index'

const startKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.getSchedule }]],
		resize_keyboard: true,
	},
}

const scheduleKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.getSchedule }, { text: Commands.home }]],
		resize_keyboard: true,
	},
}

export { startKeyboard, scheduleKeyboard }
