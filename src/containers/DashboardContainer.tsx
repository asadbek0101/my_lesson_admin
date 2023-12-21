import AppContainerLayout from "../components/app/AppContainerLayout";
import StatisticsTab from "../components/statistics/StatisticsTab";

export default function DashboardContainer(){
    return (
        <AppContainerLayout>
            <StatisticsTab/>
        </AppContainerLayout>
    )
}