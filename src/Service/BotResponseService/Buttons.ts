import { Commands } from '../../Config/enums'
import { SendMessageOptions } from '.'

const startKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.getSchedule }], [{ text: Commands.getInfo }]],
		resize_keyboard: true,
	},
}

const startKeyboardAdmin: SendMessageOptions = {
	reply_markup: {
		keyboard: [
			[{ text: Commands.getSchedule }],
			[{ text: Commands.getInfo }],
			[{ text: Commands.getStatistics }],
		],
		resize_keyboard: true,
	},
}

const scheduleKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.getSchedule }], [{ text: Commands.home }]],
		resize_keyboard: true,
	},
}

export { startKeyboard, scheduleKeyboard, startKeyboardAdmin }
