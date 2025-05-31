import useMobile from "@/hooks/common/useMobile";
import SchedulerMobile from "./SchedulerMobile";
import Scheduler from "./Scheduler";
import { useParams } from "next/navigation";
import { useSchedule } from "@/hooks/schedule/useSchedule";
import ScheduleModal from "@/components/plan/schedule/ScheduleModal";

const ScheduleWrapper = () => {

  const { isMobile } = useMobile();
  
    const { planId } = useParams();
    const { layout, setLayout, updateSchedule } = useSchedule(planId as string);

  return (
    <div
      className={`h-full`}>
      <div className={`h-full`}>
        {isMobile ? (
          <SchedulerMobile layout={layout} setLayout={setLayout} updateSchedule={updateSchedule}/>
        ) : (
          <Scheduler layout={layout} setLayout={setLayout} updateSchedule={updateSchedule}/>
        )}
      </div>
      <ScheduleModal layout={layout} setLayout={setLayout} updateSchedule={updateSchedule} />
    </div>
  )
}

export default ScheduleWrapper;