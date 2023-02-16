import { axios, parse } from ".";

class ScheduleUrl {
  private mainUrl: string = "https://www.surpk.ru";
  private urlPage: string = "https://www.surpk.ru/schedule/view?id=5";

  async getUrl(): Promise<string | undefined> {
    let url = "";

    const { data } = await axios.get<string>(this.urlPage);

    if (!data) {
      throw new Error("Не удалось получить ответ от сайта");
    }

    const document = parse(data);

    const links = document.querySelectorAll(".schedule-view-list-item-link");

    const linkHref = links[1].rawAttrs.split(" ")[0];

    url = this.mainUrl + linkHref.split('"')[1];

    return url;
  }
}

export const ScheduleUrlService = new ScheduleUrl();
