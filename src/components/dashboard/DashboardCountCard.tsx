import "./assets/dashboard-card.scss";

import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";

interface Props{
    readonly link?: string;
    readonly tab?: any;
    readonly count?: string;
    readonly title: string;
    readonly className?: string;
}

export default function DashboardCountCard({
    title,
    count,
    className,
    link,
    tab,
}:Props){
    
    const { translate } = useI18n();
    const navigate = useNavigate();

    return (
        <div className={`dashboard-card mb-4 ${className}`} 
              onClick={()=>{
                if(link && !tab){
                    navigate(`/dashboard/${link}`)
                }else if(link && tab){
                    navigate(`/dashboard/${link}?${Object.keys(tab)[0]}=${Object.values(tab)[0]}`)
                }
              }}>
            <div className="dashboard-card-tite">
                <span>{translate(title)}</span>
            </div>
            <div className="dashboard-card-line"/>
            <div className="dashboard-card-count">
                <div>
                    <span className="count">{count}</span>
                </div>
            </div>
        </div>
    )
}