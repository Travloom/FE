import GridLayout, { Layout } from "react-grid-layout";
import ScheduleBox from "./ScheduleBox";
import { PLAN_HEIGHT, PLAN_MARGIN_X, PLAN_MARGIN_Y, CONTAINER_PADDING_X, CONTAINER_PADDING_Y, COLS, GRID_WIDTH, DAY_LIST_WIDTH } from "@/constants/Plan";
import { CustomLayout } from "@/types/schedule/types";


interface Props {
  customLayout: CustomLayout[];
  onLayoutChange: (newLayout: Layout[]) => void;
  dayLen: number;
}

const GridRenderer = ({ customLayout, onLayoutChange, dayLen }: Props) => {

  const layout: Layout[] = customLayout.map(({ title: _title, content: _content, ...rest }) => rest);

  return (
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
      onLayoutChange={onLayoutChange}
    >
      {customLayout.map((item) => (
        <div key={item.i}>
          <ScheduleBox title={item.title} content={item.content} />
        </div>
      ))}
    </GridLayout>
  )
};

export default GridRenderer;
