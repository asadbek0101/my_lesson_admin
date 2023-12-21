import { useCallback, useEffect, useMemo, useState } from "react";
import LessonForm from "./LessonsForm";
import { LessonProps } from "../../api/lessons/LessonsDto";
import { useLessonContext } from "../../api/lessons/LessonsContext";
import { LessonsFilter } from "../../filters/LessonFilter";
import { update } from "immupdate";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { profileSelector } from "../../reducers/authReducer";

interface Props{
    readonly filter: LessonsFilter;
}

export default function LessonsFormWrapper({
    filter
}:Props){

    const { LessonsApi } = useLessonContext();
    
    const lessonId = useMemo(()=>filter.getLessonId(), [filter]);

    const profile = useShallowEqualSelector(profileSelector);

    const [initialValues, setInitialValues] = useState<LessonProps>({
        lessonNumber: "",
        lessonTitle: "",
        lessonDescription: "",
        lessonThemes: [],
    });

    useEffect(()=>{
        if(lessonId){
            LessonsApi.getOneLesson(Number(lessonId)).then((response: any)=>{
               setInitialValues((prev: any)=>update(prev, {
                ...response,
                lessonTitle: response.title,
                lessonNumber: response.lessonNumber,
               }))
            })
        }
    },[LessonsApi, lessonId]);

    const onSubmit = useCallback((value: LessonProps)=>{
        const json = {
            ...value,
            lessonTitle: value.lessonTitle,
            lessonNumber: value.lessonNumber,
            createdDate: new Date().toLocaleString(),
            createdBy: Number(profile?.Id),
        };
        const themes = value.lessonThemes;
        if(lessonId){
            LessonsApi.updateLesson(json)
        }else{
            LessonsApi.createLesson(json).then((response)=>{
                themes.forEach((th: any)=>{
                    const theme = {
                        type: th.value,
                        lessonId: response.data.id, 
                    }
                    LessonsApi.createTheme(theme);
                })
            })
                
        }
    },[LessonsApi, lessonId, profile]);
    
    return <LessonForm 
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            onSubmit={onSubmit}
            />
}