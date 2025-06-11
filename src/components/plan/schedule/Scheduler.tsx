import GridRenderer from "./GridRenderer";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useAddScheduleBox } from "@/hooks/schedule/useAddScheduleBox";
import { CONTAINER_PADDING_Y, PLAN_MARGIN_X, PLAN_MARGIN_Y, TIME_TABLE, TIME_WIDTH } from "@/constants/Plan";
import { Layout } from "react-grid-layout";
import { CustomLayout } from "@/types/schedule/types";
import usePlanStore from "@/stores/usePlanStore";


interface SchedulerProps {
  layout: CustomLayout[];
  setLayout: Dispatch<SetStateAction<CustomLayout[]>>;
  updateSchedule: (updatedLayout: CustomLayout[]) => void;
}


const Scheduler: React.FC<SchedulerProps> = ({
  layout,
  setLayout,
  updateSchedule,
}) => {

  const {
    days,
  } = usePlanStore();

  const handleAddScheduleBox = useAddScheduleBox(days || 1, layout, setLayout);

  const handleChangeLayout = useCallback((newLayout: Layout[]) => {
    const updatedLayout = newLayout.map((item: Layout) => {
      const matched = layout.find((p) => p.i === item.i);
      return {
        ...item,
        title: matched?.title || "",
        content: matched?.content || "",
      };
    });
    updateSchedule(updatedLayout);
  }, [layout]);

  return (
    <div className={`p-2 h-full`}>
      <div className={`h-full flex flex-col overflow-auto select-none`}>

        {/* PlanList */}
        <div className={`w-[3000px] flex`}>
          <div className={`sticky shrink-0 left-0 bg-white z-20`}>
            {/* Day List */}
            <div className={`w-full h-[12px] shrink-0 sticky top-0 left-0 bg-white`}></div>
            <div
              className={`flex flex-col gap-[2.5%] py-[25%] bg-point border border-point w-full p-1.5 items-center rounded-l-[8px] text-white`}
              style={{ paddingTop: CONTAINER_PADDING_Y, paddingBottom: CONTAINER_PADDING_Y, gap: `${PLAN_MARGIN_Y}px` }}>
              {Array.from({ length: days || 1 }).map((_, index) => (
                <p
                  key={index}
                  className={`text-center content-center text-[12px]`}
                  style={{ height: 125 }}>Day{index + 1}</p>
              ))}
            </div>
          </div>

          {/* Plan Contents */}
          <div
            className={`w-full relative`}>

            {/* Time Header */}
            <div className={`h-[13px] flex flex-row sticky top-0 bg-white z-10 text-point border-b border-point`}>
              {TIME_TABLE.map((time, index) => (
                <div key={index} className={`${TIME_WIDTH} shrink-0 text-[12px] pl-1`}>{time}</div>
              ))}
            </div>

            {/* 그리드 가로줄 디자인 */}
            <div
              className={`flex flex-col absolute w-full h-[calc(100%-13px)]`}
              style={{ paddingTop: CONTAINER_PADDING_Y, paddingBottom: CONTAINER_PADDING_Y, gap: `${PLAN_MARGIN_Y}px` }}>
              {Array.from({ length: days || 1 }).map((_, index) => (
                <div key={index} className={`w-full grow bg-[rgba(108,92,231,0.04)]`} />
              ))}
            </div>

            {/* 그리드 세로줄 디자인 */}
            <div
              className={`flex flex-row absolute w-full h-[calc(100%-13px)]`}
              style={{ paddingLeft: `${PLAN_MARGIN_X}px` }}>
              {Array.from({ length: 24 }).map((_, index) => (
                <div key={index} className={`w-full grow bg-[rgba(108,92,231,0.04)]`} style={{ marginRight: `${PLAN_MARGIN_X}px` }} />
              ))}
            </div>
            <div
              className={`cursor-pointer h-[calc(100%-13px)]`}
              onMouseDown={handleAddScheduleBox}>
              <GridRenderer customLayout={layout} onLayoutChange={handleChangeLayout} dayLen={days || 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
