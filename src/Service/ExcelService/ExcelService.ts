import { ExcelJS, axios, fs, path } from "./index";

class Excel {
  private nameToScheduleFile: string = "Schedule.xlsx";

  async getColumn(path: string, course: string, columnId: string) {
    const workbook = new ExcelJS.Workbook();

    const content = await workbook.xlsx.readFile(path);

    if (!content) {
      throw new Error("Не удалось прочитать содержимое файла");
    }

    let rows = {};

    // Даты
    // content.getWorksheet(course).columns[1].values;

    const columns = content.getWorksheet(course).columns;

    for (const column of columns) {
      if (!column.values) {
        continue;
      }

      const group = column.values[5];

      if (group == columnId) {
        rows = column.values;
        break;
      }
    }

    if (!rows) {
      throw new Error("Не удалось прочитать содержимое колонки");
    }

    return rows;
  }

  async getExcel(url: string): Promise<string> {
    const { data } = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const excelPath = path.join(
      __dirname,
      "..",
      "..",
      "Files",
      this.nameToScheduleFile
    );

    await fs.writeFileSync(excelPath, data);

    return excelPath;
  }

  async removeExcel(pathToExcel: string) {
    fs.unlink(pathToExcel, (e) => {
      if (e) {
        throw new Error("Не удалось удалить файл с расписанием");
      }
    });

    return true;
  }
}

export const ExcelService = new Excel();
