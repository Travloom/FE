import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import ScheduleBox from "./ScheduleBox";
import { TIME_DIVIDE } from "@/constants/Plan";
import { CustomLayout } from "@/types/schedule/types";


interface Props {
  customLayout: CustomLayout[];
  onLayoutChange: (newLayout: Layout[]) => void;
  _dayLen: number;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridRendererMobile = ({ customLayout, onLayoutChange, _dayLen }: Props) => {

  return (
    <ResponsiveGridLayout
      className={`layout min-h-full grow shrink-0`}
      margin={[4, 4]}
      containerPadding={[4, 4]}
      maxRows={TIME_DIVIDE}
      breakpoints={{ lg: 0 }}
      cols={{ lg: 4 }}
      rowHeight={46}
      verticalCompact={false}
      isDraggable={true}
      isResizable={true}
      compactType={null}
      preventCollision={true}
      resizeHandles={['s']}
      onLayoutChange={onLayoutChange}>
      {customLayout.map((item) => (
        <div key={item.i}
            data-grid={{
              isBounded: false,
              isDraggable: true,
              isResizable: true,
              maxH: 48,
              maxW: 1,
              minH: 1,
              minW: 1,
              moved: false,
              i:item.i,
              x:item.y, 
              y:item.x, 
              w:item.h, 
              h:item.w,
              resizeHandles:['s']}}>
        
          <ScheduleBox title={item.title} content={item.content} />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
};

export default GridRendererMobile;
