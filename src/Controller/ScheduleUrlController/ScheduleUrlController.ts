import { ScheduleUrlService } from '.'

class ScheduleUrl {
	async getUrl(): Promise<string | undefined> {
		try {
			const res = await ScheduleUrlService.getUrl()

			if (!res) {
				return
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}
}

export const ScheduleUrlController = new ScheduleUrl()
