import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Button, { BgColors } from "../ui/Button";
import { useLessonContext } from "../../api/lessons/LessonsContext";
import { LessonsFilter, ThemeTabs } from "../../filters/LessonFilter";
import { PositionType, TabPageType } from "../../api/appDTO";
import { useQuery } from "../../hooks/useQuery";
import { useI18n } from "../../i18n/I18nContext";
import { GroupBox } from "../ui/GroupBox";
import { Form, Formik } from "formik";
import { SelectPickerField } from "../form/SelectPrickerField";
import { InputField } from "../form/InputField";

import TabPage from "../tabs/TabPage";
import AddIcon from "../icons/AddIcon";
import LessonsTableWrapper from "./LessonsTableWrapper";
import LessonsFormWrapper from "./LessonsFormWrapper";
import Paginator from "../paginator/Paginator";
import DeleteIcon from "../icons/DeleteIcon";
import LessonsDetialsMenuWrapper from "./LessonsDetilsMenuWrapper";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";


export default function LessonsTab(){

    const [deleteModal, setDeleteModal] = useState(false);
    const { LessonsApi } = useLessonContext();
    const { translate } = useI18n();
    const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
    const { tab = TabPageType.Table } = useParams();
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const query = useQuery();
    const filter = useMemo(()=> new LessonsFilter(query),[query]);
    const themeType = useMemo(()=>filter.getThemeType(), [filter]);
    const lessonTab = useMemo(()=>filter.getLessonTab(), [filter]);
    const status = useMemo(()=>filter.getStatus(), [filter]);

    const statsus = [
        {
            label: translate("SELECT_PICKER_PLACEHOLDER_TITLE"),
            value: ""
        }, 
        {
            label: translate("STATUS_SELECT_PICKER_ACTIVE_TITLE"),
            value: "1"
        }, 
        {
            label: translate("STATUS_SELECT_PICKER_NON_ACTIVE_TITLE"),
            value: "0"
        },
        {
            label: translate("STATUS_SELECT_PICKER_DELETED_TITLE"),
            value: "2"
        },
    ]

    return (
        <TabPage
            visibleContentShadow={tab===TabPageType.Details}
            contentClassName={ tab === TabPageType.Details? "bg-transparent" : ""}
            headerComponent={
            <>
            {tab === TabPageType.Table && (
                <div className="d-flex align-items-center justify-content-between">
                    <Button 
                    className="py-1 px-3 text-light" 
                    bgColor={BgColors.Green}
                    heigh="34px"
                    icon={<AddIcon/>}
                    onClick={()=>navigate(`/dashboard/lessons/${TabPageType.Form}`)}
                    >
                    {translate("ADD_BUTTON_TITLE")}
                </Button>
                    <Formik
                        initialValues={{ status: {
                            label: statsus.filter((s)=>s.value === status)[0].label,
                            value: status
                        } }}
                        onSubmit={(value)=>console.log(value)}   
                        >
                        {()=>(
                            <Form
                                className="d-flex"    
                                >
                                <SelectPickerField
                                    className="ms-2"
                                    width={200}
                                    labelPosition={PositionType.Left}
                                    onChanges={(event)=>{
                                        navigate(`/dashboard/lessons/table?status=${event.value}`)
                                    }}
                                    options={statsus}
                                    name="status"/>
                                <InputField 
                                    width={300}
                                    name="searchValue" 
                                    placeholder="SEARCH_INPUT_PLACEHOLDER_TITLE"
                                    value={search}
                                    onChange={(event)=>setSearch(event.target.value)}
                                    className="ms-3"
                                    />
                            </Form>
                        )}
                    </Formik>
                </div>
                )}
            {tab === TabPageType.Form && (
                <Button 
                    className="py-1 px-3 text-light" 
                    heigh="34px"
                    bgColor={BgColors.Green}
                    onClick={()=>navigate(`/dashboard/lessons/${TabPageType.Table}`)}
                    >
                    {translate("BACK_BUTTON_TITLE")}
                </Button>
                )}
            {tab === TabPageType.Details && lessonTab === ThemeTabs.AAA && themeType === ThemeTabs.AAA && (
                <Button 
                    className="py-1 px-3 text-light" 
                    heigh="34px"
                    bgColor={BgColors.Green}
                    onClick={()=>navigate(`/dashboard/lessons/${TabPageType.Table}`)}
                    >
                    {translate("BACK_BUTTON_TITLE")}
                </Button>
            )}
            {tab === TabPageType.Details && themeType !== ThemeTabs.AAA && lessonTab === ThemeTabs.AAA  && (
                <Button 
                    className="py-1 px-3 text-light" 
                    heigh="34px"
                    bgColor={BgColors.Green}
                    onClick={()=>navigate(`/dashboard/lessons/details?themeType=${ThemeTabs.AAA}`)}
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
                </>
            }
            >
            {tab === TabPageType.Table && (
                <LessonsTableWrapper 
                    search={search}
                    filter={filter}
                    deleteDocument={setDeleteDocuments}
                    getDocument={(value: any)=>{
                        navigate(`/dashboard/lessons/${TabPageType.Details}?lessonTab=AAA&themeType=AAA&lessonId=${value.id}`)
                    }}
                    editDocument={(value: any)=>{
                        navigate(`/dashboard/lessons/${TabPageType.Form}?lessonId=${value.id}`)
                    }}
                />
            )}
            {tab === TabPageType.Form && (
                <LessonsFormWrapper filter={filter}/>
            )}
            {tab === TabPageType.Details && (
                <LessonsDetialsMenuWrapper 
                    themeType={themeType} 
                    filter={filter}/>
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
                            const json = {
                                ids: deleteDocuments,
                            }
                            LessonsApi.deleteDocuments(json).then(()=>{
                                window.location.reload();
                            })
                        }
                        setDeleteModal(false)
                     }}
                    />
               </GroupBox>
            </Modal>    
    </TabPage>
    )
}