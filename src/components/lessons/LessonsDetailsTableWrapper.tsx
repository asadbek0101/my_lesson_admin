import { useEffect, useMemo, useState } from "react";
import LessonsDetailsTable from "./LessonsDetailsTable";
import { useThemeContext } from "../../api/themes/ThemeContext";
import { LessonsFilter } from "../../filters/LessonFilter";
import YesOrNoModal from "../ui/YesOrNoModal";
import Modal from "../ui/Modal";
import { GroupBox } from "../ui/GroupBox";
import { showError } from "../../utils/NotificationUtils";
import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";
import AddIcon from "../icons/AddIcon";
import { PositionType, TabPageType } from "../../api/appDTO";
import { useI18n } from "../../i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { SelectPickerField } from "../form/SelectPrickerField";
import { InputField } from "../form/InputField";
import { Form, Formik } from "formik";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import { useDispatch } from "react-redux";
import { switchTotalPageCount, switchTotalRowCount } from "../../reducers/appReducer";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props{
    readonly filter: LessonsFilter;
}

export default function LessonsDetailsTableWrapper({
    filter
}:Props){

    const { ThemeApi } = useThemeContext();
    const { translate } = useI18n();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const locationHelpers = useLocationHelpers();

    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [document, setDocument] = useState<any>({})
    const [statusModal, setStatusModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
    const [search, setSearch] = useState("");

    useEffect(()=>{
        setLoading(true);
        ThemeApi.getThemes({ ...filter.getAllThemeFilter(), searchValue: search })
        .then((repsonse: any)=>{
            setData(repsonse.data);
            dispatch(switchTotalRowCount({ totalRowCount: repsonse.totalRowCount }))
            dispatch(switchTotalPageCount({ totalPageCount: repsonse.totalPageCount }))
            setLoading(false);
        })
        .catch(showError)
    },[ThemeApi, filter, setData, dispatch, search]);

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

    return <TabPage
                
                headerComponent={
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
                                        locationHelpers.pushQuery({ status: event.value })
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
                }

                footerComponent={
                    <>
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
                    </>
                }
                >
            <LessonsDetailsTable
                loading={loading} 
                editStatus={(row, value)=>{
                    row.status = value;
                    setDocument(row);
                    setStatusModal(true)
                }}
                data={data}
                editDocument={(value)=>console.log(value)}
                deleteDocuments={setDeleteDocuments}
                />
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
                                    lessonId: document.lessonId,
                                    themeTitle: document.themeTitle,
                                    status: document.status
                                }
                                ThemeApi.updateTheme(json)
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
                            const json: any = {
                                ids: deleteDocuments,
                            }
                            ThemeApi.deleteThemes(json).then(()=>{
                                window.location.reload();
                            })
                        }
                        setDeleteModal(false)
                     }}
                    />
               </GroupBox>
            </Modal> 
            </TabPage>
}