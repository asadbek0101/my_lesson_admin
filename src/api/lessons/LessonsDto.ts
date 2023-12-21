export interface GetAllLessonsProps{
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly searchValue?: string;
    readonly status?: string;
}

export interface DeleteLessonsProps{
    readonly ids: number[] | any;
}

export interface LessonProps{
    readonly lessonNumber: string;
    readonly lessonTitle: string;
    readonly lessonDescription: string;
    readonly lessonThemes: string[];
}

export interface ThemeListProps{
    readonly Id: string;
    readonly LessonId: string;
    readonly LessonType: string;
}