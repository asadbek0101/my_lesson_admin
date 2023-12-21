import QuestionCountForm from "../ui/QuestionCountForm";

interface Props{
    readonly initialValues: any;
}

export default function LessonTestCountForm({
    initialValues
}:Props){
    return <QuestionCountForm data={initialValues}/>

}