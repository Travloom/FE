import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useParams } from "next/navigation";
import GridRenderer from "./GridRenderer";
import { useCallback, useState } from "react";
import { useSchedule } from "@/hooks/schedule/useSchedule";
import { useAddPlanBox } from "@/hooks/schedule/useAddPlanBox";
import { CONTAINER_PADDING_Y, PLAN_HEIGHT, PLAN_MARGIN_X, PLAN_MARGIN_Y, PLANNER_HEIGHT, PLANNER_WIDTH, TIME_TABLE, TIME_WIDTH } from "@/constants/Plan";
import { Layout } from "react-grid-layout";

const Scheduler = () => {
  const [dayLen] = useState(4);
  const { planId } = useParams();
  const { layout, setLayout, updateSchedule } = useSchedule(planId as string);
  const handleAddPlanBox = useAddPlanBox(layout, setLayout);

  const handleChangeLayout = useCallback((newLayout: Layout[]) => {
    const updatedLayout = newLayout.map((item: Layout) => {
      const matched = layout.find((p) => p.i === item.i);
      return {
        ...item,
        title: matched?.title || "",
        content: matched?.content || "",
      };
    });
    setLayout(updatedLayout);
    updateSchedule(updatedLayout);
  }, [layout]);

  return (

    <div className={`p-2.5`}>
      <div className={`flex flex-col overflow-auto select-none`}>

        {/* Time Header */}
        <div className={`${PLANNER_WIDTH} h-[12px] flex flex-row sticky top-0 bg-white z-10 text-point`}>
          <div className={`w-[55px] shrink-0 sticky left-0 bg-white`}></div>
          {TIME_TABLE.map((time, index) => (
            <div key={index} className={`${TIME_WIDTH} shrink-0 text-[12px]`}>{time}</div>
          ))}
        </div>

        {/* PlanList */}
        <div className={`${PLANNER_WIDTH} flex`}>
          <div className={`sticky shrink-0 left-0 bg-white z-10`}>
            {/* Day List */}
            <div
              className={`${PLANNER_HEIGHT} flex flex-col gap-[2.5%] py-[25%] bg-point border border-point w-[55px] items-center rounded-l-[8px] text-white`}
              style={{ paddingTop: CONTAINER_PADDING_Y, paddingBottom: CONTAINER_PADDING_Y, gap: `${PLAN_MARGIN_Y}px` }}>
              {["Day1", "Day2", "Day3", "Day4"].map((day, index) => (
                <p
                  key={index}
                  className={`text-center content-center text-[14px]`}
                  style={{ height: PLAN_HEIGHT }}>Day{index + 1}</p>
              ))}
            </div>
          </div>

          {/* Plan Contents */}
          <div
            className={`w-full cursor-pointer relative`}
            onMouseDown={handleAddPlanBox}>

            {/* 그리드 가로줄 디자인 */}
            <div
              className={`flex flex-col absolute w-full h-full`}
              style={{ paddingTop: CONTAINER_PADDING_Y, paddingBottom: CONTAINER_PADDING_Y, gap: `${PLAN_MARGIN_Y}px` }}>
              {Array.from({ length: dayLen }).map((_, index) => (
                <div key={index} className={`w-full grow bg-[rgba(108,92,231,0.04)]`} />
              ))}
            </div>

            {/* 그리드 세로줄 디자인 */}
            <div
              className={`flex flex-row absolute w-full h-full`}
              style={{ paddingLeft: `${PLAN_MARGIN_X}px` }}>
              {Array.from({ length: 24 }).map((_, index) => (
                <div key={index} className={`w-full grow bg-[rgba(108,92,231,0.04)]`} style={{ marginRight: `${PLAN_MARGIN_X}px` }} />
              ))}
            </div>

            <GridRenderer customLayout={layout} onLayoutChange={handleChangeLayout} dayLen={dayLen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
