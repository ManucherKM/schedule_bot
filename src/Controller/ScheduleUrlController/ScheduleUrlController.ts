import { Subdivision } from '../../Config/enums'
import { ScheduleUrlService } from '../../Service/ScheduleUrlService/ScheduleUrlService'

class ScheduleUrl {
	async getUrl(subdivision: Subdivision) {
		try {
			if (!subdivision) {
				console.log('Не удалось найти подразделение')
				return
			}

			const res = await ScheduleUrlService.getUrl(subdivision)

			return res
		} catch (e) {
			console.log(e)
		}
	}
}

export const ScheduleUrlController = new ScheduleUrl()
