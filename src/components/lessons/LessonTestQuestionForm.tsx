import { useCallback } from "react";
import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import QuestionForm from "../ui/QuestionForm";
import AddIcon from "../icons/AddIcon";
import { update } from "immupdate";

interface Props{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
}

export default function LessonTestQuestionForm({
    initialValues,
    setInitialValues,
}:Props){

    const { translate } = useI18n();

    const onChangeQuestion = useCallback((value: any, index: any)=>{
            const data = [...initialValues.questions];
            data[index].title = value;
            setInitialValues((prev: any)=>update(prev, {
                questions: data
            }));
    },[initialValues, setInitialValues]);

    const onChangeAnswer = useCallback((value: any, qIndex: any, aIndex: any)=>{
            const data = [...initialValues.questions];
            data[qIndex].answers[aIndex].title = value;
            setInitialValues((prev: any)=>update(prev, {
                questions: data
            }));
    },[initialValues, setInitialValues])

    const addQuestion = useCallback(()=>{
        const data = [...initialValues.questions];
        const question = {
            title: ``,
            answers: [],
        }
        data.push(question);
        setInitialValues((prev: any)=>update(prev, {
            questions: data
        }))
    },[setInitialValues, initialValues.questions]);

    const addAnswer = useCallback((qIndex: any)=>{
        const data = [...initialValues.questions];
        const answer = {
            title: "",
            isRight: "0",
        }
        data[qIndex].answers.push(answer);
        setInitialValues((prev: any)=>update(prev, {
            questions: data
        }))
    },[setInitialValues, initialValues]);

    const deleteQuestion = useCallback((qIndex: any)=>{
        const data = [...initialValues.questions];
        data.splice(qIndex, 1);
        setInitialValues((prev: any)=>update(prev, {
            questions: data
        }))
    },[setInitialValues, initialValues]);

    const deleteAnswer = useCallback((aIndex: any, qIndex: any)=>{
        const data = [...initialValues.questions];
        data[qIndex].answers.splice(aIndex, 1);
        setInitialValues((prev: any)=>update(prev, {
            questions: data
        }))
    },[setInitialValues, initialValues]);

    const onChagneIsRight = useCallback((aIndex: any, qIndex: any)=>{
        const data = [...initialValues.questions];
        data[qIndex].answers.forEach((a: any)=>a.isRight = "0")
        data[qIndex].answers[aIndex].isRight = "1";
        setInitialValues((prev: any)=>update(prev, {
            questions: data
        }))
    },[setInitialValues, initialValues]);

    return (
        <div style={{
                height: "78vh",
                overflow: "hidden",
                overflowY: "scroll"
            }}
            >
            {initialValues.questions.map((qq: any, questonIndex: number)=>{
                return (
                    <QuestionForm 
                        key={questonIndex}
                        questonIndex={questonIndex}
                        question={qq.title} 
                        answers={qq.answers}
                        onChangeQuestion={(value: any)=>onChangeQuestion(value.target.value, questonIndex)}
                        onChangeAnswer={(value, answerIndex)=>onChangeAnswer(value.target.value, questonIndex, answerIndex)}
                        deleteQuestion={(value)=>deleteQuestion(value)}
                        deleteAnswer={(value)=>deleteAnswer(value, questonIndex)}
                        onChecked={(value)=>onChagneIsRight(value, questonIndex)}
                        addAnswer={()=>addAnswer(questonIndex)}
                        />
                )})
            }
            <div className="d-flex justify-content-end">
                <Button
                    className="px-4 py-2 text-light mt-2"
                    bgColor={BgColors.Green}
                    onClick={()=>addQuestion()}
                    icon={<AddIcon/>}
                    >
                    {translate("ADD_QUESTION_BUTTON_TITLE")}
                </Button>
            </div>
        </div>
    )
}