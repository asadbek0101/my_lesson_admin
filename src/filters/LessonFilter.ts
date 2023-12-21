import { AppFilter, AppFilterProps } from "./AppFilter";

enum LessonFilterTabs {
}

export enum ThemeTabs{
    AA = "AA",
    AB = "AB",
    AC = "AC",
    AD = "AD",
    AE = "AE",
    AAA = "AAA"
}

interface LessonFilterProps extends AppFilterProps<LessonFilterTabs> {
    readonly lessonId: string;
    readonly themeId: string;
    readonly themeType: ThemeTabs;
    readonly lessonTab: ThemeTabs;
}

export class LessonsFilter extends AppFilter<LessonFilterTabs>{
    private readonly lessonId: string;
    private readonly themeId: string;
    private readonly themeType: ThemeTabs;
    private readonly lessonTab: ThemeTabs;
    public constructor(
        {lessonId, lessonTab, themeId, themeType, ...props } = {} as LessonFilterProps,
    ){
        super({ ...props });
        this.lessonId = lessonId || "";
        this.themeType = themeType || ThemeTabs.AAA;
        this.themeId = themeId;
        this.lessonTab = lessonTab || ThemeTabs.AAA;
    }

    public getLessonId(){
        return this.lessonId;
    }

    public getThemeId(){
        return this.themeId;
    }

    public getThemeType(){
        return this.themeType;
    }

    public getLessonTab(){
        return this.lessonTab;
    }

    public getAllThemeFilter(){
        return {
            pageNumber: this.pageCount,
            pageSize: this.perPage,
            themeType: this.lessonTab,
            status: this.status
        };
    }

    public getLessonsFilter(){
        return {
            pageNumber: this.pageCount,
            pageSize: this.perPage,
            status: this.status
        }
    }
}