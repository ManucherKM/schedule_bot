import { Commands } from '../../Config/enums'
import { SendMessageOptions } from '../../Types/types'

const HomeKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [
			[
				{ text: Commands.getCoupleSchedule },
				{ text: Commands.getBellSchedule },
			],
			[{ text: Commands.getRatings }, { text: Commands.getProfile }],
		],
		resize_keyboard: true,
	},
}

const SettingProfileKeyboard: SendMessageOptions = {
	reply_markup: {
		keyboard: [[{ text: Commands.change }], [{ text: Commands.back }]],
		resize_keyboard: true,
	},
}

export { HomeKeyboard, SettingProfileKeyboard }
