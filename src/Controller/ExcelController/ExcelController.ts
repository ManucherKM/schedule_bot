import { ExcelService } from '../../Service/ExcelService/ExcelService'
import { CellValue } from '../../Types/types'

class Excel {
	async getColumn(path: string, course: string, columnId: string) {
		try {
			if (!course || !columnId || !path) {
				console.log('Некорректные входные данные')
				return []
			}

			const res = await ExcelService.getColumn(path, course, columnId)

			return res as CellValue[]
		} catch (e) {
			console.log(e)
			return []
		}
	}

	async getExcel(url: string | undefined) {
		try {
			if (!url) {
				console.log('Не указан URL к файлу')
				return false
			}

			const res = await ExcelService.getExcel(url)

			if (!res) {
				return false
			}

			return res
		} catch (e) {
			console.log(e)
			return false
		}
	}

	getPathToSchedule() {
		const res: string = ExcelService.getPathToSchedule()

		if (!res) {
			return false
		}

		return res
	}
}

export const ExcelController = new Excel()
