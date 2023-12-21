import { useNavigate, useParams } from "react-router-dom";
import { TabPageType } from "../../api/appDTO";
import { useI18n } from "../../i18n/I18nContext";
import { useMemo, useState } from "react";
import { GroupBox } from "../ui/GroupBox";
import { ResultFilter } from "../../filters/ResultFilter";
import { useQuery } from "../../hooks/useQuery";

import TabPage from "../tabs/TabPage";
import ResultTableWrapper from "./ResultTableWrapper";
import ResultUserTableWrapper from "./ResultUserTableWrapper";
import Button, { BgColors } from "../ui/Button";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";

export default function ResultTab(){

    const query = useQuery();
    const filter = useMemo(()=>new ResultFilter(query), [query])
    const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
    const [deleteModal, setDeleteModal] = useState(false);
    const { tab = TabPageType.Table } = useParams();
    const { translate } = useI18n();
    const navigate = useNavigate();

    return (
        <TabPage
            headerComponent={
                <>
                {tab !== TabPageType.Table && (
                    <Button 
                        className="py-1 px-3 text-light" 
                        heigh="34px"
                        bgColor={BgColors.Green}
                        onClick={()=>navigate(`/dashboard/results/${TabPageType.Table}`)}
                        >
                        {translate("BACK_BUTTON_TITLE")}
                    </Button>
                    )}
                </>
            }
            footerComponent={
                <>
                    {tab === TabPageType.Table && (
                        <div className="d-flex justify-content-between align-items-center h-100">
                            <Button
                                disabled={ !(deleteDocuments && deleteDocuments?.length > 0 )}
                                onClick={()=>setDeleteModal(true)}
                                 className="py-2 px-2 text-light" 
                                 bgColor={deleteDocuments && deleteDocuments?.length > 0? BgColors.Red : BgColors.White}
                                >
                                <DeleteIcon color={ deleteDocuments && deleteDocuments?.length > 0? "#fff" : "#000" }/>
                            </Button>
                            <Paginator filter={filter}/>
                        </div>
                    )}
                    {tab === TabPageType.Details && (
                        <div className="d-flex justify-content-between align-items-center h-100">
                            <Button
                                disabled={ !(deleteDocuments && deleteDocuments?.length > 0 )}
                                onClick={()=>setDeleteModal(true)}
                                 className="py-2 px-2 text-light" 
                                 bgColor={deleteDocuments && deleteDocuments?.length > 0? BgColors.Red : BgColors.White}
                                >
                                <DeleteIcon color={ deleteDocuments && deleteDocuments?.length > 0? "#fff" : "#000" }/>
                            </Button>
                            <Paginator filter={filter}/>
                        </div>
                    )}
                </>
            }
            >
            {tab === TabPageType.Table && (
                <ResultTableWrapper
                    deleteDocuments={setDeleteDocuments}
                    getDocument={(value)=>{
                        navigate(`/dashboard/results/${TabPageType.Details}?testId=${value.id}`) 
                    }}
                    />
            )}
            {tab === TabPageType.Details && (
                <ResultUserTableWrapper
                    deleteDocuments={setDeleteDocuments}
                    getDocument={(value)=>{
                        navigate(`/dashboard/results/${TabPageType.Details}?testId=${value.id}`) 
                    }}
                    />
            )}
           <Modal 
                show={deleteModal} 
                closeHandler={()=>setDeleteModal(false)}
                className="d-flex justify-content-center align-items-center"
                contentClassName="rounded p-4"
                width="500px"
                >
               <GroupBox>
               <YesOrNoModal 
                    title="LESSONS_TABLE_DELETE_LESSONS_QUESTION_TITLE"
                    setResponse={(value: string)=>{
                        if(value === "YES"){
                            // const json = {
                            //     ids: deleteDocuments,
                            // }
                        }
                        setDeleteModal(false)
                     }}
                    />
               </GroupBox>
            </Modal>  
        </TabPage>
    )
}