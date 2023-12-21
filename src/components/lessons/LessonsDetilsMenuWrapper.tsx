import { useEffect, useMemo, useState } from "react";
import { LessonsFilter, ThemeTabs } from "../../filters/LessonFilter";
import { ArrayFilterByWord } from "../../utils/ArrayFilterByWord";
import { useThemeContext } from "../../api/themes/ThemeContext";
import { ThemeListProps } from "../../api/lessons/LessonsDto";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/NotificationUtils";

import LessonsPracticalWorkFormWrapper from "./LessonsPracticalWorkFormWrapper";
import LessonsPPTXFormWrapper from "./LessonsPPTXFormWrapper";
import LessonTestFormWrapper from "./LessonTestFormWrapper";
import ThemeCardMenu from "../theme/ThemeCardMenu";
import LessonsLaboratoryWorkFormWrapper from "./LessonsLaboratoryWorkFormWrapper";

interface Props{
    readonly filter: LessonsFilter;
    readonly themeType: ThemeTabs;
}

export default function LessonsDetialsMenuWrapper({
    filter,
    themeType
}:Props){

    const { ThemeApi } = useThemeContext();

    const navigate = useNavigate();

    const [data, setData] = useState<ThemeListProps[]>([]);

    const lessonId = useMemo(()=>filter.getLessonId(), [filter]);

    useEffect( ()=>{
        if(lessonId){
         ThemeApi.getThemeByLesson(Number(lessonId))
            .then((response: any)=>{
            const data = ArrayFilterByWord(response);
             setData(data);
            }).catch(showError)
        }
    },[ThemeApi, lessonId, setData]);

    return (
        <>
            {themeType === ThemeTabs.AAA && (
                <ThemeCardMenu 
                    data={data} 
                    selectTheme={(id: number, type: any)=>navigate(`/dashboard/lessons/details?lessonTab=AAA&themeType=${type}&themeId=${id}`)}/>
            )}
            {themeType === ThemeTabs.AA && (
                <LessonsPracticalWorkFormWrapper
                    filter={filter}
                    />
            )}
            {themeType === ThemeTabs.AB && (
                <LessonsLaboratoryWorkFormWrapper
                    filter={filter}
                    />
            )}
            {themeType === ThemeTabs.AC && (
                <LessonsPPTXFormWrapper/>
            )}
            {themeType === ThemeTabs.AD && (
                <div>
                    Video Tab
                </div>
            )}
            {themeType === ThemeTabs.AE && (
                <LessonTestFormWrapper 
                    filter={filter}/>
            )}
        </>
    )
}