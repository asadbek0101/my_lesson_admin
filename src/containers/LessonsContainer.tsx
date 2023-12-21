import { useMemo } from "react";
import { useQuery } from "../hooks/useQuery";
import { LessonsFilter, ThemeTabs } from "../filters/LessonFilter";

import AppContainerLayout from "../components/app/AppContainerLayout";
import LessonsTab from "../components/lessons/LessonsTab";
import LessonsDetailsTab from "../components/lessons/LessonsDetailsTab";

export default function LessonsContainer(){

    const query = useQuery();

    const filter  = useMemo(()=>new LessonsFilter(query), [query]);

    const themeType = useMemo(()=>filter.getLessonTab(), [filter]);

    return (
        <AppContainerLayout>
            {themeType === ThemeTabs.AAA && (
                <LessonsTab/> 
            )}
            {themeType !== ThemeTabs.AAA && (
                <LessonsDetailsTab 
                    filter={filter}/>
            )}
        </AppContainerLayout>
    )
}