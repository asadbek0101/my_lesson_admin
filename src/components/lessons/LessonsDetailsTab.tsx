import { LessonsFilter } from "../../filters/LessonFilter";

import LessonsDetailsFormWrapper from "./LessonsDetailsFormWrapper";

import LessonsDetailsTableWrapper from "./LessonsDetailsTableWrapper";

interface Props{
    readonly filter: LessonsFilter;
}

export default function LessonsDetailsTab({
    filter
}:Props){

    return (
            <LessonsDetailsTableWrapper
                filter={filter}
                />
    )
}