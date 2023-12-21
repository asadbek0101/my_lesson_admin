import { useEffect, useState } from "react";
import { useDashboardContext } from "../../api/dashboard/DashboardContext";
import DashboardCountCard from "../dashboard/DashboardCountCard";
import { showError } from "../../utils/NotificationUtils";
import Loader from "../ui/Loader";

export default function StatisticsTab(){

  const { DashboardApi } = useDashboardContext();
  const [data, setData] = useState({
    totalAll: "",
    totalLessonCount: "",
    totalUserCount: "",
    totalTestCount: "",
    totalPracticalCount: "",
    totalLaboratoryCount: "",
    totalPPTCount: "",
    totalVideoCount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>{
      setLoading(true);
      DashboardApi.getAllCounts()
      .then((response: any)=>{
        setLoading(false);
        setData(response.data); 
    })
      .catch((error: any)=>{
        setLoading(false);
        setError(error.data[0].userMsg);
        // showError(error)
      })
  },[DashboardApi])

    return (
       <>
        {loading && (
            <Loader/>
        )}
        {!loading && error !== "" && (
            <h1>{error}</h1>
        )}
        {!loading && error === "" && (
           <div className="row px-5 mt-5">
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="users" 
               count={data.totalUserCount}
               title="DASHBOARD_USERS_CARD_TITLE"
               />
           </div>
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="lessons" 
               count={data.totalLessonCount}
               title="DASHBOARD_LESSONS_CARD_TITLE"
               />
           </div>
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="lessons"
               tab={{ lessonTab: "AA" }}
               count={data.totalPracticalCount}
               title="DASHBOARD_PRACTICAL_CARD_TITLE"
               />
           </div>
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="lessons"
               tab={{ lessonTab: "AB" }}
               count={data.totalLaboratoryCount}
               title="DASHBOARD_LABORATORY_CARD_TITLE"
               />
           </div>
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="lessons"
               tab={{ lessonTab: "AC" }}
               count={data.totalPPTCount}
               title="DASHBOARD_PPTS_CARD_TITLE"
               />
           </div>
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="lessons"
               tab={{ lessonTab: "AD" }}
               count={data.totalVideoCount}
               title="DASHBOARD_VIDEOS_CARD_TITLE"
               />
           </div>
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="lessons"
               tab={{ lessonTab: "AE" }} 
               count={data.totalTestCount}
               title="DASHBOARD_TESTS_CARD_TITLE"
               />
           </div>
           <div className="col-xxl-3 col-lg-4 col-md-6 p-3 px-4">
             <DashboardCountCard 
               link="results" 
               count={data.totalVideoCount}
               title="DASHBOARD_RESULTS_CARD_TITLE"
               />
           </div>
       </div>
        )}
       </>
    )
}