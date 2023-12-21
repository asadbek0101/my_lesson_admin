import {  useEffect, useState } from "react";
import { useLessonContext } from "../../api/lessons/LessonsContext";
import { LessonsFilter } from "../../filters/LessonFilter";
import { showError } from "../../utils/NotificationUtils";

import LessonsTable from "./LessonsTable";
import { GroupBox } from "../ui/GroupBox";
import YesOrNoModal from "../ui/YesOrNoModal";
import Modal from "../ui/Modal";
import { useDispatch } from "react-redux";
import { switchTotalPageCount, switchTotalRowCount } from "../../reducers/appReducer";

interface Props{
    readonly getDocument: (value: any) => void;
    readonly editDocument: (value: any) => void;
    readonly deleteDocument: (value: any) => void;
    readonly filter: LessonsFilter;
    readonly search: string;
}

export default function LessonsTableWrapper({
    getDocument,
    editDocument,
    deleteDocument,
    filter,
    search
}:Props){

  const [data, setData] = useState<any>();
  const { LessonsApi } = useLessonContext();
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [document, setDocument] = useState<any>({});
  const  dispatch  = useDispatch();

    useEffect(()=>{
        setLoading(true)
        LessonsApi.getAllLessons({ ...filter.getLessonsFilter(), searchValue: search.toUpperCase()})
        .then((response: any)=>{
                setLoading(false);
                setData(response.data);
                dispatch(switchTotalPageCount({ totalPageCount: response.totalPageCount }))
                dispatch(switchTotalRowCount({ totalRowCount: response.totalRowCount }))
        })
        .catch(showError)
    },[LessonsApi, filter, search, dispatch]);

    return <>
            <LessonsTable 
                loading={loading}
                data={data} 
                getDocument={getDocument} 
                editDocument={editDocument} 
                editStatus={(row, value)=>{
                    row.status = value;
                    setDocument(row);
                    setStatusModal(true)
                }}
                deleteDocuments={deleteDocument}/>
            <Modal
                show={statusModal}
                closeHandler={()=>setStatusModal(false)}
                className="d-flex justify-content-center align-items-center"
                contentClassName="rounded p-4"
                width="500px"
                >
                <GroupBox>
                    <YesOrNoModal 
                        title="Do you want to change status that this document?"
                        setResponse={(value)=>{
                            if(value === "YES") {
                                const json = {
                                    id: document.id,
                                    lessonTitle: document.lessonTitle,
                                    status: document.status,
                                    lessonNumber: document.lessonNumber,
                                }
                                LessonsApi.updateLesson(json)
                                .then((response: any)=>{
                                    console.log(response);
                                    window.location.reload();
                                })
                            } else {
                                setStatusModal(false);
                            }
                        }}
                        />
                </GroupBox>
            </Modal>
            </>
}