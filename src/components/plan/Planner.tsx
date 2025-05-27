import { useEffect, useState } from "react";
import Toggle from "../common/Toggle";
import Scheduler from "./schedule/Scheduler";
import Sidebar from "./map/Sidebar";
import SchedulerMobile from "./schedule/SchedulerMobile";
import Bottombar from "./map/Bottombar";
import GoogleMapWrapper from "./map/GoogleMapWrapper";

const Planner = () => {

  const [selectedToggle, setSelectedToggle] = useState("일정");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <div className={`lg:rounded-[8px] flex flex-col border border-gray-300 bg-white h-full overflow-hidden`}>
      <div className={`flex flex-row gap-2.5 p-2.5 w-full border-b border-gray-300 shrink-0`}>
        <Toggle text={"일정"} isActive={selectedToggle === "일정"} setSelectedToggle={setSelectedToggle} />
        <Toggle text={"지도"} isActive={selectedToggle === "지도"} setSelectedToggle={setSelectedToggle} />
      </div>
      <div className={`h-full overflow-hidden`}>

        {selectedToggle === '일정' &&
          <div
            className={`h-full`}>
            <div className={`h-full`}>
              {isMobile ? (
                <SchedulerMobile />
              ) : (
                <Scheduler />
              )}
            </div>
          </div>
        }

        <div
          className={`
              ${selectedToggle === '지도' ? `` : `hidden`}
              relative h-full`}>
          <Sidebar />
          <Bottombar />
          <GoogleMapWrapper />
        </div>

      </div>
    </div>
  )
}

export default Planner;