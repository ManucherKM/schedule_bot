import { ExcelJS, axios, fs, path } from '.'

class Excel {
	private nameToScheduleFile: string = 'Schedule.xlsx'
	private pathToScheduleFile: string = ''

	async getColumn(path: string, course: string, columnId: string) {
		const workbook = new ExcelJS.Workbook()

		const content = await workbook.xlsx.readFile(path)

		if (!content) {
			throw new Error('Не удалось прочитать содержимое файла')
		}

		let rows = {}

		// Даты
		// content.getWorksheet(course).columns[1].values;

		const columns = content.getWorksheet(course).columns

		for (const column of columns) {
			if (!column.values) {
				continue
			}

			const group = column.values[5]

			if (group == columnId) {
				rows = column.values
				break
			}
		}

		if (!rows) {
			throw new Error('Не удалось прочитать содержимое колонки')
		}

		return rows
	}

	async getExcel(url: string): Promise<string> {
		const { data } = await axios.get(url, {
			responseType: 'arraybuffer',
		})

		const excelPath = path.join(
			__dirname,
			'..',
			'..',
			'Files',
			this.nameToScheduleFile,
		)

		this.pathToScheduleFile = excelPath

		await fs.writeFileSync(excelPath, data)

		return excelPath
	}

	getPathToSchedule(): string {
		return this.pathToScheduleFile
	}
}

export const ExcelService = new Excel()
