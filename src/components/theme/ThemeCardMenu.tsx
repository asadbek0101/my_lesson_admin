import { LessonThemeTypes } from "../../api/appDTO";
import { ThemeListProps } from "../../api/lessons/LessonsDto";
import ThemeCard from "./ThemeCard";

interface Props{
    readonly data: ThemeListProps[];
    readonly selectTheme: (id: number, type: LessonThemeTypes ) => void;
}

export default function ThemeCardMenu({
    data,
    selectTheme
}:Props){

    return (
        <div className="row">
            {data && data.map((th: any, index)=>{
                return (
                <div key={index} className="col-xl-3 col-lg-4 col-md-6">
                    <ThemeCard 
                        themeType={th.themeType} 
                        onSelectThemeType={()=>selectTheme(th.id, th.themeType)}
                        />
                </div>
                )
            })}
       </div>
    )
}