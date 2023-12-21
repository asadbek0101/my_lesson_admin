import { DeleteLessonsProps, GetAllLessonsProps } from "./LessonsDto";
import { BaseApi } from "../BaseApi";

export class LessonsApi extends BaseApi {
  public getAllLessons(query: GetAllLessonsProps): Promise<any[]> {
    return this.get("Lesson/GetAll", {
        query: query,
    });
  }

  public getLessonsList(themeType: string): Promise<any[]> {
    return this.get("Lesson/ListOfLessons", {
        query: { themeType },
    });
  }

  public getOneLesson(id: number): Promise<any> {
    return this.get("Lesson/GetOne", {
        query: { id: id }
    });
  }

  public getOnePage(themeId: number, themeType: string): Promise<any> {
    return this.get("Page/GetOnePage", {
        query: { themeId, themeType }
    });
  }

  public getTests(lessonId: number): Promise<any> {
    return this.get("Test/GetTests", {
        query: { LessonId: lessonId }
    });
  }

  public createLesson(json: any): Promise<any> {
    return this.post("Lesson/Create", {
      json,
    });
  }

  public createTheme(json: any): Promise<any> {
    return this.post("Theme/Create", {
      json,
    });
  }

  public createTest(json: any): Promise<any> {
    return this.post("Test/Create", {
      json,
    });
  }

  public updateTest(json: any): Promise<any> {
    return this.put("Test/Update", {
      json,
    });
  }

  public createPage(json: any): Promise<any> {
    return this.post("Page/CreatePage", {
      json,
    });
  }

  public updateLesson(json: any): Promise<any> {
    return this.put("Lesson/Update", {
      json,
    });
  }

  public deleteDocuments(json: DeleteLessonsProps): Promise<any> {
    return this.delete("Lesson/Delete", {
        json
    });
  }
}
