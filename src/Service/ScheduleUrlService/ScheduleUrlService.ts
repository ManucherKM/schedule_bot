import axios from 'axios'
import { parse } from 'node-html-parser'
import { Subdivision, UrlsSubdivision } from '../../Config/enums'

class ScheduleUrl {
	private urlSite: string = 'https://www.surpk.ru'

	async getUrl(subdivision: Subdivision) {
		let url = ''

		let page = ''

		if (subdivision === Subdivision.SP1) {
			page = UrlsSubdivision.SP1
		} else if (subdivision === Subdivision.SP2) {
			page = UrlsSubdivision.SP2
		} else if (subdivision === Subdivision.SP3) {
			page = UrlsSubdivision.SP3
		} else if (subdivision === Subdivision.SP4) {
			page = UrlsSubdivision.SP4
		}

		const { data } = await axios.get<string>(page)

		if (!data) {
			throw new Error('Не удалось получить ответ от сайта')
		}

		const document = parse(data)

		const links = document.querySelectorAll('.schedule-view-list-item-link')

		const linkHref = links[1].rawAttrs.split(' ')[0]

		url = this.urlSite + linkHref.split('"')[1]

		return url
	}
}

export const ScheduleUrlService = new ScheduleUrl()
