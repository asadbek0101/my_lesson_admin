import { BaseApi } from "../BaseApi";
import { GetAllThemeQuery, GetThemeByLesson } from "./ThemeDto";

export class ThemeApi extends BaseApi {

  public getThemes(  query : GetAllThemeQuery): Promise<GetThemeByLesson[]> {
    return this.get("Theme/GetAll", {
      query: query,
    });
  }

  public getThemeByLesson(lessonId: number): Promise<GetThemeByLesson[]> {
    return this.get("Theme/GetByLesson", {
        query: {lessonId : lessonId},
    });
  }

  public createTheme(json: any): Promise<any> {
    return this.post("Theme/Create", {
        json
    });
  }

  public updateTheme(json: any): Promise<any> {
    return this.put("Theme/Update", {
        json
    });
  }

  public deleteThemes(json: any): Promise<any> {
    return this.delete("Theme/Delete", {
        json
    });
  }
}