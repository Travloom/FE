/* eslint-disable */

import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ScheduleBox from "./ScheduleBox";
import { useEffect, useState } from "react";
import { COLS, CONTAINER_PADDING_X, CONTAINER_PADDING_Y, DAY_LIST_WIDTH, GRID_HEIGHT, GRID_WIDTH, PLAN_HEIGHT, PLAN_MARGIN_X, PLAN_MARGIN_Y, PLANNER_HEIGHT, PLANNER_WIDTH, TIME_TABLE, TIME_WIDTH } from "@/constants/Plan";
import { v4 as uuidv4 } from "uuid";

interface CustomLayout extends Layout {
  title: string;
  content: string;
}

const Scheduler = () => {

  const [dayLen, setDaylen] = useState(4);

  const [layout, setLayout] = useState<CustomLayout[]>([]);

  const handleAddPlanBox = (e: React.MouseEvent<HTMLDivElement>) => {

    const gridWidth = (GRID_WIDTH - DAY_LIST_WIDTH);
    const colWidth = gridWidth / COLS;
    const rowHeight = GRID_HEIGHT / 4;

    // 클릭 위치 가져오기
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const x = Math.floor(offsetX / colWidth);
    const y = Math.floor(offsetY / rowHeight);

    // 이미 해당 위치에 있는지 확인
    const isOccupied = layout.some(
      (item: CustomLayout) =>
        x < item.x + item.w &&
        x + 2 > item.x &&
        y < item.y + item.h &&
        y + 1 > item.y
    );

    if (!isOccupied) {
      const newItem = {
        i: uuidv4(),
        x,
        y,
        w: 2,
        h: 1,
        title: "일정",
        content: "내용",
      };
      setLayout([...layout, newItem]);
    }
  };

  const handleChangeLayout = (newLayout: Layout[]) => {
    setLayout((prev) =>
      newLayout.map((item) => {
        const matched = prev.find((p) => p.i === item.i);
        return {
          ...item,
          title: matched?.title || "",
          content: matched?.content || "",
        };
      })
    );
  }

  useEffect(() => {
    console.log(layout)
  }, [layout])

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

            <GridLayout
              className={`layout min-h-full grow shrink-0 border-t border-b border-r border-point rounded-r-[8px]`}
              layout={layout}
              margin={[PLAN_MARGIN_X, PLAN_MARGIN_Y]}
              containerPadding={[CONTAINER_PADDING_X, CONTAINER_PADDING_Y]}
              cols={COLS}
              maxRows={dayLen}
              rowHeight={PLAN_HEIGHT}
              verticalCompact={false}
              width={GRID_WIDTH - DAY_LIST_WIDTH}
              isDraggable={true}
              isResizable={true}
              compactType={null}
              preventCollision={true}
              resizeHandles={['e']}
              onLayoutChange={(newLayout) => handleChangeLayout(newLayout)}>
              {layout.map((item) => (
                <div key={item.i}>
                  <ScheduleBox title={item.title} content={item.content} />
                </div>
              ))}
            </GridLayout>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scheduler;