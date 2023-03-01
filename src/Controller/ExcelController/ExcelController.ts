import { CellValue, ExcelService } from './index'

class Excel {
	async getColumn(
		path: string | undefined,
		course: string | undefined,
		columnId: string | undefined
	): Promise<CellValue[]> {
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

	async getExcel(url: string | undefined): Promise<string | false> {
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

	async removeExcel(pathToExcel: string | undefined): Promise<boolean> {
		try {
			if (!pathToExcel) {
				console.log('Не удалось найти путь к удаляемому файлу')
				return false
			}

			const res = await ExcelService.removeExcel(pathToExcel)

			if (!res) {
				console.log('Не удалось удалить файл с расписанием')
				return false
			}

			return res
		} catch (e) {
			console.log(e)
			return false
		}
	}

	getPathToSchedule(): string | false {
		const res: string = ExcelService.getPathToSchedule()

		if (!res) {
			return false
		}

		return res
	}
}

export const ExcelController = new Excel()
