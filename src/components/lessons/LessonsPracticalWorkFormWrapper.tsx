import { useCallback, useEffect, useMemo, useState } from "react";
import { useLessonContext } from "../../api/lessons/LessonsContext";
import { LessonsFilter } from "../../filters/LessonFilter";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";

import LessonsPracticalWorkForm from "./LessonsPracticalWorkForm";

interface Props{
    readonly filter: LessonsFilter;
}

export default function LessonsPracticalWorkFormWrapper({
    filter
}:Props){

    const [value, setValue] = useState("");

    const { LessonsApi } = useLessonContext();

    const themeId = useMemo(()=>filter.getThemeId(), [filter]);
    const themeType = useMemo(()=>filter.getThemeType(), [filter]);

    useEffect(()=>{
        if(themeId){
            LessonsApi.getOnePage(Number(themeId), themeType)
            .then((response)=>{
                if(response){
                    setValue(response.pageDetails);
                }
            })
            .catch(showError)
        }
    },[LessonsApi, themeId, setValue, themeType])

    const onSubmit = useCallback((value: any)=>{
        const data = {
            themeId: Number(themeId),
            pageType: themeType,
            pageDetails: value
        }
        LessonsApi.createPage(data)
        .then((response)=>{
            toast.success("Practical Work is Saved");
            console.log(response)
        })
        .catch(showError)
    },[LessonsApi, themeId, themeType])

    return <LessonsPracticalWorkForm 
                value={value} 
                setValue={setValue}
                onSubmit={onSubmit}
                />
}