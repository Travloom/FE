import useMobile from "@/hooks/common/useMobile";
import SchedulerMobile from "./SchedulerMobile";
import Scheduler from "./Scheduler";
import { useParams } from "next/navigation";
import { useSchedule } from "@/hooks/schedule/useSchedule";
import ScheduleModal from "@/components/plan/schedule/ScheduleModal";
import { CustomLayout } from "@/types/schedule/types";
import { Dispatch, SetStateAction } from "react";

interface ScheduleWrapperProps {
  layout: CustomLayout[];
  setLayout: Dispatch<SetStateAction<CustomLayout[]>>;
  updateSchedule: (updatedLayout: CustomLayout[]) => void;
}

const ScheduleWrapper:React.FC<ScheduleWrapperProps> = ({
  layout,
  setLayout,
  updateSchedule,
}) => {

  const { isMobile } = useMobile();


  return (
    <div
      className={`h-full`}>
      <div className={`h-full`}>
        {isMobile ? (
          <SchedulerMobile layout={layout} setLayout={setLayout} updateSchedule={updateSchedule} />
        ) : (
          <Scheduler layout={layout} setLayout={setLayout} updateSchedule={updateSchedule} />
        )}
      </div>
      <ScheduleModal layout={layout} setLayout={setLayout} updateSchedule={updateSchedule} />
    </div>
  )
}

export default ScheduleWrapper;