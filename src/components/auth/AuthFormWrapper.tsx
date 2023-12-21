import { useCallback, useState } from "react";
import { switchUsername } from "../../reducers/appReducer";
import { useAuthContext } from "../../api/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthProps } from "../../api/auth/AuthDto";
import { setToken } from "../../reducers/authReducer";
import { toast } from "react-toastify";

import AuthForm from "./AuthForm";
import { useI18n } from "../../i18n/I18nContext";

export default function AuthFormWrapper(){

    const { AuthApi } = useAuthContext();

    const { translate } = useI18n();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState<AuthProps>({
        username: "",
        password: "",
    });

    const onSubmit = useCallback((value: AuthProps)=>{
        if(value.username.length === 0){
            toast.warn(translate("AUTH_REQUIRED_USERNAME_TITLE"))
        }else if(value.password.length === 0){
            toast.warn(translate("AUTH_REQUIRED_PASSWORD_TITLE"))
        }else{
            AuthApi.Login(value)
            .then((response: any)=>{
                if(response.token){
                    toast.success("Successully")
                    dispatch(setToken({ token : response.token}));
                    dispatch(switchUsername({ username: response.userName }));
                    navigate('/dashboard/statistic');
                }else{
                    toast.error(response.message);
                }
            })
        }
    },[AuthApi, dispatch, navigate, translate])

    return <AuthForm 
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                onSubmit={onSubmit}
                />
}