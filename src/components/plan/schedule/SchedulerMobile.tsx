import { MOBILE_TIME_HEIGHT, TIME_TABLE } from "@/constants/Plan";
import GridRendererMobile from "./GridRendererMobile";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Layout } from "react-grid-layout";
import { useAddMobilePlanBox } from "@/hooks/schedule/useAddMobilePlanBox";
import { CustomLayout } from "@/types/schedule/types";
import usePlanStore from "@/stores/usePlanStore";


interface SchedulerProps {
  layout: CustomLayout[];
  setLayout: Dispatch<SetStateAction<CustomLayout[]>>;
  updateSchedule: (updatedLayout: CustomLayout[]) => void;
}

const SchedulerMobile: React.FC<SchedulerProps> = ({
  layout,
  setLayout,
  updateSchedule,
}) => {

  const {
    days,
  } = usePlanStore();

  const handleAddPlanBoxMobile = useAddMobilePlanBox(layout, setLayout);

  const handleChangeLayoutMobile = useCallback((newLayout: Layout[]) => {
    const updatedLayout = newLayout.map((item: Layout) => {
      const matched = layout.find((p) => p.i === item.i);
      return {
        ...item,
        x: item.y,
        y: item.x,
        h: item.w,
        w: item.h,
        title: matched?.title || "",
        content: matched?.content || "",
      };
    });
    updateSchedule(updatedLayout);

  }, [layout]);

  return (
    <div className={`w-full h-full py-1 pr-1.5 relative`}>
      <div className={`overflow-auto h-full`}>
        <div className={` flex flex-row select-none`}>

          {/* Time */}
          <div className={`flex flex-col h-fit sticky left-0 z-10`}>
            <div className={`w-full h-[24px] bg-white sticky top-0 shrink-0 z-10`}></div>
            {TIME_TABLE.map((time, index) => (
              <div
                key={index}
                className={`shrink-0 text-[10px] text-point px-1 py-1`}
                style={{ height: MOBILE_TIME_HEIGHT }}>{time}</div>
            ))}
          </div>


          {/* Plan Contents */}
          <div className={`grow flex flex-col`}>
            {/* Day List */}
            <div className={`grow sticky top-0 bg-white z-10`}>
              <div
                className={`flex flex-row bg-point border border-point w-full min-w-[300px] h-[24px] items-center rounded-t-[8px] justify-between text-white sticky top-0`}>
                {["Day1", "Day2", "Day3", "Day4"].map((day, index) => (
                  <p
                    key={index}
                    className={`text-center content-center text-[10px] grow`}>{day}</p>
                ))}
              </div>
            </div>
            <div className={`w-full h-full rounded-b-[8px] relative border-point border border-t-0`}>


              {/* 그리드 세로줄 디자인 */}
              <div className={`flex flex-row gap-1 pt-1 w-full h-full absolute top-0`}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className={`w-full h-full bg-[rgba(108,92,231,0.04)]`} />
                ))}
              </div>


              {/* 그리드 가로로줄 디자인 */}
              <div className={`flex flex-col gap-1 pt-1 w-full h-full absolute top-0`}>
                {Array.from({ length: 24 }).map((_, index) => (
                  <div key={index} className={`w-full h-full bg-[rgba(108,92,231,0.04)]`} />
                ))}
              </div>

              <div
                className={`cursor-pointer w-full h-full`}
                onMouseDown={handleAddPlanBoxMobile}>
                <GridRendererMobile customLayout={layout} onLayoutChange={handleChangeLayoutMobile} dayLen={days} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulerMobile;