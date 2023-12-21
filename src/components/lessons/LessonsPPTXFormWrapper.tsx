import { useState } from "react";
import LessonsPPTXForm from "./LessonsPPTXForm";

export default function LessonsPPTXFormWrapper(){

    const [initialValues, setInitialValues] = useState([]);

    return <LessonsPPTXForm 
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                />
}