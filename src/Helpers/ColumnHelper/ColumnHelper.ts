import { EDays, IDay, IColumnHelper } from ".";

export function ColumnHelper<T>(column: T[]): IColumnHelper<T> {
  const group = column[5];
  const nameGroup = column[6];

  const res = {
    group,
    nameGroup,
    info: [] as IDay[],
  };

  // С седьмого элемента массива начинается перечисление пар
  let count = 7;

  for (let i = 0; i < 6; i++) {
    const day: IDay = {
      name: EDays[i],
      schedule: [],
    };

    const chunk = column.slice(count, (count += 8));

    for (let j = 0; j < chunk.length; j++) {
      const pair = chunk[j];

      if (pair === undefined) {
        day.schedule = [...day.schedule, `${j + 1}. Нет`];
        continue;
      }

      day.schedule = [...day.schedule, `${j + 1}. ${pair}`];
    }

    res.info.push(day);
  }

  return res;
}
