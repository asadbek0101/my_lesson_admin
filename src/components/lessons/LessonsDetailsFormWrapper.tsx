import LessonsDetailsModalTable from "./LessonsDetailsModalTable";
import { useLessonContext } from "../../api/lessons/LessonsContext";
import { showError } from "../../utils/NotificationUtils";
import { LessonsFilter } from "../../filters/LessonFilter";
import { useCallback, useEffect, useMemo, useState } from "react";

import TabPage from "../tabs/TabPage";
import LessonsDetailsForm from "./LessonsDetailsForm";
import Modal from "../ui/Modal";
import { GroupBox } from "../ui/GroupBox";
import { update } from "immupdate";
import { useThemeContext } from "../../api/themes/ThemeContext";

interface Props{
    readonly filter: LessonsFilter
}

export default function LessonsDetailsFormWrapper({
    filter
}:Props){

    const { LessonsApi } = useLessonContext();
    const { ThemeApi } = useThemeContext();

    const [listModal, setListModal] = useState(false);
    const [lessonsList, setLessonsList] = useState([]);

    const [initialValues, setInitialValues] = useState({
        themeTitle: "",
        lessonOfTheme: "",
        lessonId: ""
    });

    const themeType = useMemo(()=>filter.getLessonTab(), [filter])

    useEffect(()=>{
        LessonsApi.getLessonsList(themeType)
        .then((response: any)=>setLessonsList(response.data))
        .catch(showError)
    },[LessonsApi, themeType]);

    const onSubmit = useCallback((value: any)=>{
        const json = {
            lessonId: value.lessonId, 
            themeTitle: value.themeTitle,
            themeType: themeType
        }
        ThemeApi.createTheme(json)
        .then((repsonse)=>{

        })
        .catch(showError);
    },[ThemeApi, themeType])

    return (
        <TabPage>
            <LessonsDetailsForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                getLessonList={()=>setListModal(true)}
                onSubmit={onSubmit}
                />
            <Modal
                show={listModal}
                closeHandler={()=>setListModal(false)}
                width="1000px"
                className="d-flex align-items-center justify-content-center"
                contentClassName="rounded p-4"
                >
                <GroupBox>
                    <LessonsDetailsModalTable
                        data={lessonsList}
                        setRow={(value)=>{
                            setInitialValues((prev: any)=>update(prev, {
                                lessonOfTheme: value.lessonNumber + " - dars: " + value.lessonTitle,
                                themeTitle: value.lessonTitle,
                                lessonId: value.id
                            }))
                            setListModal(false)
                        }}
                        />
                </GroupBox>
            </Modal>
        </TabPage>
    )
}