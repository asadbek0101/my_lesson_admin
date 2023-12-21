import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import { FileAccept, useSelectFile } from "../../hooks/useSelectFile";
import { useLessonContext } from "../../api/lessons/LessonsContext";
import { LessonsFilter } from "../../filters/LessonFilter";
import { showError } from "../../utils/NotificationUtils";
import { readXlsx } from "../../utils/FileUtils";
import { update } from "immupdate";
import { toast } from "react-toastify";

import LessonTestCountForm from "./LessonTestCountForm";
import LessonTestQuestionForm from "./LessonTestQuestionForm";
import EmptyTest from "../ui/EmptyTest";

interface Props{
    readonly filter: LessonsFilter;
}

export default function LessonTestFormWrapper({
    filter
}:Props){

    const { translate } = useI18n();

    const [tests, setTests] = useState({
        id: "",
        questions: [],
    });

    const { LessonsApi } = useLessonContext();

    const emptyPage = useMemo(()=>tests.questions?.length > 0, [tests]);

    useEffect(()=>{
    LessonsApi.getTests(Number(filter.getThemeId()))
        .then((response)=>{
            setTests(response)
        })
        .catch(showError);
    },[LessonsApi, filter]);

    const addFromEmpty = useCallback(()=>{
        const data: any = [...tests.questions];
        const question = {
            title: "",
            answers: [],
        }
        data.push(question);
        setTests((per: any)=>update(per, {
        questions: data,
       }))
    },[tests, setTests])

    const savaHandler = useCallback((value: any)=>{
        const json = {
            ...value,
            lessonId: Number(filter.getLessonId()),
        }
        if(!tests.id){
            LessonsApi.createTest(json).then((response)=>{
                toast.success(response.message);
            }).catch(showError);
        } else {
            LessonsApi.updateTest(json).then((response)=>{
                toast.success(response.message);
            }).catch(showError);
        }

    },[tests, LessonsApi, filter])

    const uploadFromExcel = useCallback(
        (header: any, value: any) => {
            const headers = Object.keys(header);
            headers.shift();
            const data: any = [];
            value && value.forEach((element: any) => {
                const answers: any = [];
                headers.forEach((h, index2)=>{
                    if(headers.length !== index2 + 1)
                        answers.push({
                            title: element[h],
                            isRight: element[headers[headers.length-1]] === index2 + 1? "1" : "0"
                        })
                    })
                    const question = {
                        title: element.A,
                        answers: answers,
                    }
                data.push(question);
            });
            setTests((prev: any)=>update(prev, {
                questions: data
            }));
        },
        [setTests],
      );

    const fileSelectorExcel = useSelectFile({
        accept: [FileAccept.Excel],
        onSelect: (x) =>
          readXlsx(x[0]).then((x: any) => {
            const header = x.shift();
            uploadFromExcel && uploadFromExcel(header, x);
          }),
      });

    return (
        <>
            {!emptyPage && (
                <EmptyTest
                    uploadFromExcel={()=>fileSelectorExcel.open()}
                    onClick={addFromEmpty}
                />
            )}
            {emptyPage && (
                <div className="row">
                <div className="col-9">
                    <LessonTestQuestionForm 
                        initialValues={tests}
                        setInitialValues={setTests}/>
                </div>
                <div className="col-3">
                    <LessonTestCountForm
                        initialValues={tests}
                        />
                    <Button
                        className="py-2 w-100 mt-3 text-light"
                        bgColor={BgColors.Green}
                        onClick={() => savaHandler(tests)}
                        >
                        {translate("SAVE_BUTTON_TITLE")}
                    </Button>
                </div>
            </div>
            )}
        </>
    )
}