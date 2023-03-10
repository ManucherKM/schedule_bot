import { Commands } from '../../Config/enums'
import { SendMessageOptions } from '../../Types/types'

const startKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.back }], [{ text: Commands.getBellSchedule }]],
		resize_keyboard: true,
	},
}

const startKeyboardAdmin: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.getStatistics }]],
		resize_keyboard: true,
	},
}

const scheduleKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.back }], [{ text: Commands.getBellSchedule }]],
		resize_keyboard: true,
	},
}

export { startKeyboard, scheduleKeyboard, startKeyboardAdmin }
