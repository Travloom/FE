import { useState } from "react";
import Toggle from "../common/Toggle";
import Sidebar from "./map/Sidebar";
import BottomSheet from "./map/BottomSheet";
import GoogleMapWrapper from "./map/GoogleMapWrapper";
import ScheduleWrapper from "./schedule/ScheduleWrapper";
import { useSchedule } from "@/hooks/schedule/useSchedule";
import { useParams } from "next/navigation";
import usePlanStore from "@/stores/usePlanStore";
import Motion from "../motion/Motion";

const Planner = () => {

  const {
    isSchedulePending,
  } = usePlanStore();

  const { planId } : { planId: string } = useParams();
  const { layout, setLayout, updateSchedule } = useSchedule(planId as string);

  const [selectedToggle, setSelectedToggle] = useState("일정");

  return (
    <>
      {!isSchedulePending && (
        <Motion.MotionDiv className={`lg:rounded-[8px] flex flex-col border border-gray-300 bg-white h-full overflow-hidden`}>
          <div className={`flex flex-row gap-2.5 p-2.5 w-full border-b border-gray-300 shrink-0`}>
            <Toggle text={"일정"} isActive={selectedToggle === "일정"} setSelectedToggle={setSelectedToggle} />
            <Toggle text={"지도"} isActive={selectedToggle === "지도"} setSelectedToggle={setSelectedToggle} />
          </div>
          <div className={`h-full overflow-hidden`}>

            {selectedToggle === '일정' &&
              <ScheduleWrapper layout={layout} setLayout={setLayout} updateSchedule={updateSchedule} />
            }

            <div
              className={`
              ${selectedToggle === '지도' ? `` : `hidden`}
              relative h-full`}>
              <Sidebar />
              <BottomSheet />
              <GoogleMapWrapper />
            </div>

          </div>
        </Motion.MotionDiv>
      )}
    </>
  )
}

export default Planner;