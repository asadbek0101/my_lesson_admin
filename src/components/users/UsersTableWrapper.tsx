import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useUsersContext } from "../../api/users/UsersContext";
import { UserFilter } from "../../filters/UserFIlter";
import { PositionType, TabPageType } from "../../api/appDTO";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { GroupBox } from "../ui/GroupBox";
import { SelectPickerField } from "../form/SelectPrickerField";
import Button, { BgColors } from "../ui/Button";
import { useDispatch } from "react-redux";
import { switchTotalPageCount, switchTotalRowCount } from "../../reducers/appReducer";
import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";

import TabPage from "../tabs/TabPage";
import UsersTable from "./UsersTable";
import AddIcon from "../icons/AddIcon";
import Paginator from "../paginator/Paginator";
import DeleteIcon from "../icons/DeleteIcon";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import { showError } from "../../utils/NotificationUtils";

interface Props{
    readonly filter: UserFilter;
}

export default function UsersTableWrapper({
    filter,
}:Props){

    const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
    const [deleteModal, setDeleteModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [document, setDocument] = useState<any>({});
    const [search, setSearch] = useState("");
    const [data, setData] = useState();

    const { UsersApi } = useUsersContext();
    const navigate = useNavigate();
    const { translate } = useI18n();
    const dispatch = useDispatch();
    const status = useMemo(()=>filter.getStatus(), [filter]);
    const userType = useMemo(()=>filter.getUserType(), [filter])

    useEffect(()=>{
        setLoading(true)
        UsersApi.getAllUsers({ ...filter.getAllUsersFilter(), searchValue: search.toUpperCase()})
        .then((response: any)=>{
            setLoading(false)
            setData(response.data);
            dispatch(switchTotalPageCount({ totalPageCount: response.totalPageCount }))
            dispatch(switchTotalRowCount({ totalRowCount: response.totalRowCount }))
        })
        .catch((error: any)=>console.log(error))
    },[UsersApi, filter, dispatch, search]);

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

    const roles = [
        {
            label: translate("SELECT_PICKER_PLACEHOLDER_TITLE"),
            value: ""
        }, 
        {
            label: translate("ROLE_SELECT_PICKER_ADMIN_TITLE"),
            value: "0"
        }, 
        {
            label: translate("ROLE_SELECT_PICKER_TEACHER_TITLE"),
            value: "1"
        },
        {
            label: translate("ROLE_SELECT_PICKER_ASSISTANT_TITLE"),
            value: "2"
        },
        {
            label: translate("ROLE_SELECT_PICKER_STUDENT_TITLE"),
            value: "3"
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
                    onClick={()=>navigate(`/dashboard/users/${TabPageType.Form}`)}
                    >
                    {translate("ADD_BUTTON_TITLE")}
                </Button>
                    <Formik
                        initialValues={{ status: {
                            label: statsus.filter((s)=>s.value === status)[0].label,
                            value: status
                        },
                        userType:  {
                            label: roles.filter((s)=>s.value === userType)[0].label,
                            value: userType
                        }}}
                        onSubmit={(value)=>console.log(value)}   
                        >
                        {()=>(
                            <Form
                                className="d-flex"    
                                >
                                <SelectPickerField
                                    width={200}
                                    labelPosition={PositionType.Left}
                                    onChanges={(event)=>{
                                        navigate(`/dashboard/users/table?status=${status}&userType=${event.value}`)
                                    }}
                                    options={roles}
                                    name="userType"/>
                                <SelectPickerField
                                    className="ms-3"
                                    width={200}
                                    labelPosition={PositionType.Left}
                                    onChanges={(event)=>{
                                        navigate(`/dashboard/users/table?status=${event.value}&userType=${userType}`)
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
                }
                >
            <UsersTable
                loading={loading} 
                data={data} 
                editStatus={(row, value)=>{
                    row.status = value;
                    setDocument(row);
                    setStatusModal(true)
                }}
                editDocument={(value)=>navigate(`/dashboard/users/${TabPageType.Form}?userId=${value.id}`)} 
                deleteUser={setDeleteDocuments}/>
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
                            UsersApi.deleteUsers(json).then(()=>{
                                window.location.reload();
                            })
                        }
                        setDeleteModal(false)
                     }}
                    />
               </GroupBox>
            </Modal>
            <Modal 
                show={statusModal} 
                closeHandler={()=>setStatusModal(false)}
                className="d-flex justify-content-center align-items-center"
                contentClassName="rounded p-4"
                width="500px"
                >
               <GroupBox>
               <YesOrNoModal 
                    title="Switch Status"
                    setResponse={(value: string)=>{
                        if(value === "YES"){
                            const json = {
                                userId: document.id,
                                status: document.status
                            }
                            UsersApi.updateUserStatus(json).
                            then((response: any)=>{
                                console.log(response);
                                window.location.reload();
                            });
                        }
                        setStatusModal(false)
                     }}
                    />
               </GroupBox>
            </Modal>
        </TabPage>
}