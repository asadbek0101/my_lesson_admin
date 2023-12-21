import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";


import AppContainer from "./AppContainer";
import UsersContainer from "./UsersContainer";
import LessonsContainer from "./LessonsContainer";
import AuthContainer from "./AuthContainer";
import SettingsContainer from "./SettingsContainer";
import DashboardContainer from "./DashboardContainer";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import { tokenSelector } from "../reducers/authReducer";
import ResultsContainer from "./ResultsContainer";

export default function RootContainer(){
    
    const token = useShallowEqualSelector(tokenSelector);

    const isAuthorized = useMemo(()=>Boolean(token), [token]);

    const locatonPath = useLocation().pathname;

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthorized || locatonPath === "/"){
            navigate("auth");
        }
        if(isAuthorized && locatonPath === "/"){
            navigate("/dashboard/statistic");
        }
    },[isAuthorized, navigate, locatonPath]);

return (
    <Routes>
        {isAuthorized && (
            <Route path="/dashboard" element={<AppContainer/>}>
            <Route path="users/:tab?" element={<UsersContainer/>}/>
            <Route path="lessons/:tab?" element={<LessonsContainer/>}/>
            <Route path="results/:tab?" element={<ResultsContainer/>}/>
            <Route path="settings/:tab?" element={<SettingsContainer/>}/>
            <Route path="statistic/:tab?" element={<DashboardContainer/>}/>
            </Route>
        )}
       <Route path="/auth" element={<AuthContainer/>}/>
    </Routes>
    )
}