export interface GetThemeByLessonQuery{
    readonly LessonId: number;
}

export interface GetThemeByLesson{
    readonly LessonId: number;
    readonly Type: string
}

export interface GetAllThemeQuery{
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly themeType: string;
    readonly searchValue?: string;
    readonly status?: string;
}