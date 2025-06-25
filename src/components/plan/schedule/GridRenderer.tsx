import GridLayout, { Layout } from "react-grid-layout";
import ScheduleBox from "./ScheduleBox";
import { PLAN_MARGIN_X, PLAN_MARGIN_Y, CONTAINER_PADDING_X, CONTAINER_PADDING_Y, TIME_DIVIDE, SCHEDULE_HEIGHT } from "@/constants/Plan";
import { CustomLayout } from "@/types/schedule/types";


interface Props {
  customLayout: CustomLayout[];
  onLayoutChange: (newLayout: Layout[]) => void;
  dayLen: number;
}

const GridRenderer = ({ customLayout, onLayoutChange, dayLen }: Props) => {

  return (
    <GridLayout
      className={`layout !min-h-full grow shrink-0`}
      style={{ height: '100%' }}
      margin={[PLAN_MARGIN_X, PLAN_MARGIN_Y]}
      containerPadding={[CONTAINER_PADDING_X, CONTAINER_PADDING_Y]}
      cols={TIME_DIVIDE}
      maxRows={dayLen}
      rowHeight={SCHEDULE_HEIGHT}
      verticalCompact={false}
      width={3000}
      isDraggable={true}
      isResizable={true}
      compactType={null}
      preventCollision={true}
      resizeHandles={['e']}
      onLayoutChange={onLayoutChange}>
      {customLayout.map((item) => (
        <div key={item.i}
            data-grid={{
              isBounded: false,
              isDraggable: true,
              isResizable: true,
              maxH: 1,
              maxW: 48,
              minH: 1,
              minW: 1,
              moved: false,
              i:item.i,
              x:item.x, 
              y:item.y, 
              w:item.w, 
              h:item.h,
              resizeHandles:['e']}}>
          <ScheduleBox scheduleId={item.i} title={item.title} content={item.content} />
        </div>
      ))}
    </GridLayout>
  )
};

export default GridRenderer;
