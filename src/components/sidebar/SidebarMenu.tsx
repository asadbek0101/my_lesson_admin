import "./assets/sidebar-menu.scss";
import { useI18n } from "../../i18n/I18nContext";
import DashboardIcon from "../icons/DashboardIcon";
import MyLinksIcon from "../icons/MyLinksIcon";
import SettingsIcon from "../icons/SettingsIcon";
import CustomLine from "../ui/CustomLine";
import SidebarItem from "./SidebarItem";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { Profile, profileSelector } from "../../reducers/authReducer";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType } from "../../api/appDTO";
import { useNavigate } from "react-router-dom";
import SidebarAppChildMenu from "./SidebarAppChildMenu";
import SidebarChildItem from "./SidebarChildItem";
import { LessonsFilter, ThemeTabs } from "../../filters/LessonFilter";
import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";

export default function SidebarMenu(){

    const { translate } = useI18n();

    const profile: Profile | undefined = useShallowEqualSelector(profileSelector);

    const menu = useShallowEqualSelector(appMenuTypeSelector);

    const navigate = useNavigate();

    const query = useQuery();

    const lessonsFilter = useMemo(()=>new LessonsFilter(query),[query]);

    const lessonTab = useMemo(()=>lessonsFilter.getLessonTab(), [lessonsFilter]);

    return (
        <div className="sidebar-menu">
            <div className="sidebar-menu-header">
                {menu === AppMenuType.Opened && (
                    <span 
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={()=>navigate('/dashboard/statistic')}>
                        {profile?.role}
                    </span>
                )}
            </div>
            <div className="sidebar-menu-menu">
                <SidebarItem
                    link="statistic"
                    icon={<DashboardIcon/>}
                    >
                    {translate("SIDE_MENU_DASHBOARD_TITLE")}
                </SidebarItem>
                <SidebarItem
                    link="users"
                    icon={<MyLinksIcon/>}
                    >
                    {translate("SIDE_MENU_USERS_TITLE")}
                </SidebarItem>
                <SidebarItem
                    link="lessons"
                    icon={<MyLinksIcon/>}
                    child={
                    <SidebarAppChildMenu
                            defaultTab={ThemeTabs.AAA}
                            activeTab={lessonTab}
                            onChangeTab={(value)=>navigate(`/dashboard/lessons?lessonTab=${value}`)}
                            >
                        <SidebarChildItem
                            tab={ThemeTabs.AAA}
                            >
                            {translate("LESSONS_TAB_LESSONS_TAB_TITLE")}
                        </SidebarChildItem>
                        <SidebarChildItem
                            tab={ThemeTabs.AA}
                            >
                            {translate("LESSONS_TAB_PRACTICAL_TAB_TITLE")}
                        </SidebarChildItem>
                        <SidebarChildItem
                            tab={ThemeTabs.AB}
                            >
                            {translate("LESSONS_TAB_LABORATORY_TAB_TITLE")}
                        </SidebarChildItem>
                        <SidebarChildItem
                            tab={ThemeTabs.AC}
                            >
                            {translate("LESSONS_TAB_PPT_TAB_TITLE")}
                        </SidebarChildItem>
                        <SidebarChildItem
                            tab={ThemeTabs.AD}
                            >
                            {translate("LESSONS_TAB_VIDEOS_TAB_TITLE")}
                        </SidebarChildItem>
                        <SidebarChildItem
                            tab={ThemeTabs.AE}
                            >
                            {translate("LESSONS_TAB_TESTS_TAB_TITLE")}
                        </SidebarChildItem>
                    </SidebarAppChildMenu>
                    }
                    >
                    {translate("SIDE_MENU_LESSONS_TITLE")}
                </SidebarItem>
                <SidebarItem
                    link="results"
                    icon={<MyLinksIcon/>}
                    >
                    {translate("SIDE_MENU_RESULTS_TITLE")}
                </SidebarItem>
                <CustomLine/>
                <SidebarItem
                    link="settings"
                    icon={<SettingsIcon/>}
                    >
                    {translate("SIDE_MENU_SETTINGS_TITLE")}
                </SidebarItem>
            </div>
        </div>
    )
}