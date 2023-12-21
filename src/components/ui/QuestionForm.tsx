import { Form, Formik } from "formik";
import { GroupBox } from "./GroupBox";
import { TextAreaField } from "../form/TextAreaField";
import { useI18n } from "../../i18n/I18nContext";

import AppBox from "../app/AppBox";
import AddIcon from "../icons/AddIcon";
import Button, { BgColors } from "./Button";
import TestAnswer from "../tests/TestAnswer";
import DeleteIcon from "../icons/DeleteIcon";

interface Props{
    readonly question: string;
    readonly answers: any[];
    readonly questonIndex: any;
    readonly onChangeQuestion: (value: any) => void;
    readonly onChangeAnswer: (value: any, index: any) => void;
    readonly deleteQuestion: (value: any) => void;
    readonly deleteAnswer: (value: any) => void;
    readonly onChecked: (value: any) => void;
    readonly addAnswer: () => void;
}

export default function QuestionForm({
    answers,
    question,
    questonIndex,
    onChangeQuestion,
    onChangeAnswer,
    deleteQuestion,
    deleteAnswer,
    onChecked,
    addAnswer
}:Props){
    
    const { translate } = useI18n();

    return (
         <Formik
            initialValues={{}}
            onSubmit={()=>console.log("D")}>
            {()=>(
                <Form>
                    <AppBox
                        className="p-3 mb-2"
                        >
                    <GroupBox>
                        <TextAreaField 
                            name={`${question}+${questonIndex}`}
                            defaultValue={question}
                            onChange={onChangeQuestion}
                            />
                            {answers && answers.map((an: any, index)=>{
                                return (
                                    <TestAnswer  
                                        key={index}
                                        inputName={index.toString()}
                                        checkName={an.isRight + questonIndex + index}
                                        checked={an.isRight === "1"}
                                        onChange={(event:any)=>onChangeAnswer(event, index)}
                                        onChecked={()=>onChecked(index)}
                                        deleteF={()=>deleteAnswer(index)}
                                        value={an.title}
                                        />
                                )
                            })}
                            
                        <div className="d-flex justify-content-end mt-3">
                            <Button 
                                className="px-2 py-2 text-light" 
                                bgColor={BgColors.Red}
                                onClick={()=>deleteQuestion(questonIndex)}
                                icon={<DeleteIcon/>}
                                >
                                {translate("REMOVE_QUESTION_BUTTON_TITLE")}
                            </Button>
                            <Button 
                                className="px-2 py-2 text-light ms-3" 
                                bgColor={BgColors.Green}
                                onClick={addAnswer}
                                icon={<AddIcon/>}>
                                {translate("ADD_ANSWER_BUTTON_TITLE")}
                            </Button>
                        </div>
                    </GroupBox>
                </AppBox>
            </Form>
            )}
        </Formik>
    )
}