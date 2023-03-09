import { CellValue, IColumnHelper } from '.'

export function ScheduleMessageHelper(days: IColumnHelper<CellValue>): string {
	let message = ''

	for (const dayInfo of days.info) {
		let day = `\n\n<b>${dayInfo.name}</b>`

		if (dayInfo.schedule.length === 0) {
			day += '\nВ этот день пар нет.'
			message += day

			continue
		}

		for (const pair of dayInfo.schedule) {
			day += `\n${pair}`
		}

		message += day
	}

	return message
}
