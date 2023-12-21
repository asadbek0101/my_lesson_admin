import { useCallback, useEffect, useMemo, useState } from "react";
import { useUsersContext } from "../../api/users/UsersContext";
import { CreateUserProps } from "../../api/users/UsersDto";
import UsersForm from "./UsersForm";
import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { TabPageType } from "../../api/appDTO";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { UserFilter } from "../../filters/UserFIlter";
import { update } from "immupdate";

interface Props{
    readonly filter: UserFilter;
}

export default function UsersFormWrapper({
    filter
}:Props){

    const { UsersApi } = useUsersContext();

    const [roles, setRoles] = useState<any>([]);
    const { translate } = useI18n();
    const navigate = useNavigate();

    const userId = useMemo(()=>filter.getUserId(), [filter])

    const [initialValues, setIntialValues] = useState({
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        role: "",
    });

    useEffect(()=>{
        if(userId){
            UsersApi.getOneUser(Number(userId))
            .then((response: any)=>{
                setIntialValues(response);
                setIntialValues((prev: any)=>update(prev, {
                    role: {
                        label: response.role,
                        value: response.role
                    }
                }))
            })
            .catch(showError);
        }
    },[userId, UsersApi])

    useEffect(()=>{
        UsersApi.getAllRoles()
        .then((response: any)=>{
            let arr: any = []
            for(let i=0; i<response.length; i++){
                arr.push({ label: response[i].name, value: response[i].name.toUpperCase(), })
            }
           setRoles(arr);
        })
        .catch(showError)
    },[UsersApi]);

    const onSubmit = useCallback((value: any)=>{
        const data: CreateUserProps = {
            ...value,
            email: value.email,
            userName: value.userName,
            roleName: value.role.value.toUpperCase(),
            password: value.password,
            status: "1"
        }
        if(userId){
            UsersApi.updateUser(data)
            .then((response: any)=>{
                toast.success(response.message)
                navigate(`/dashboard/users/${TabPageType.Table}`)
            }).catch(showError)
        }else{
            UsersApi.createUser(data)
            .then((response: any)=>{
                toast.success(response.message)
                navigate(`/dashboard/users/${TabPageType.Table}`)
            }).catch(showError)
        }
    },[UsersApi, navigate, userId]);


    return<TabPage
                headerComponent={
                    <Button 
                    className=" px-3 text-light" 
                    bgColor={BgColors.Green}
                    heigh="34px"
                    onClick={()=>navigate(`/dashboard/users/${TabPageType.Table}`)}
                    >
                    {translate("BACK_BUTTON_TITLE")}
                </Button>
                }
                >
         <UsersForm 
                roles={roles} 
                initialValues={initialValues} 
                setInitialValues={setIntialValues} 
                onSubmit={onSubmit}/>
    </TabPage>
}