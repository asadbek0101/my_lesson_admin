export enum TabPageType{
    Table = "table",
    Form = "form",
    Details = "details",
    UserResults = "user-results"
}

export enum AppMenuType{
  Opened = "opened",
  Closed = "closed"
}

export enum PositionType {
  Top = "top",
  Left = "left",
  Right = "right",
  Bottom = "bottom",
}

export interface Dict<T> {
    readonly [key: string]: T;
  }

  export type SvgProps = React.SVGProps<SVGSVGElement>;

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export enum SizeType {
    Small = "small",
    Large = "large",
    Medium = "medium",
  }

  export enum Direction { 
    Vertical = "vertical",
    Horizontal = "horizontal",
}


export enum LessonThemeTypes{
  Lessons = "LL",
  PracticalWork = "AA",
  LabaratroyWork = "AB",
  PPT = "AC",
  VideoLesson = "AD",
  LessonTest = "AE"
}