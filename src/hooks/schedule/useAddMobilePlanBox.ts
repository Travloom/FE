import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { TIME_DIVIDE } from "@/constants/Plan";
import { CustomLayout } from "@/types/schedule/types";

export const useAddMobilePlanBox = (layout: CustomLayout[], setLayout: (val: CustomLayout[]) => void) => {
  return (e: MouseEvent<HTMLDivElement>) => {

    const rect = e.currentTarget.getBoundingClientRect();

    const colWidth = rect.width / 4;
    const rowHeight = rect.height / TIME_DIVIDE;

    const offsetX = e.clientY - rect.top;
    const offsetY = e.clientX - rect.left;

    const x = Math.floor(offsetX / rowHeight);
    const y = Math.floor(offsetY / colWidth);

    const isOccupied = layout.some(item =>
      x < item.x + item.w &&
      x + 2 > item.x &&
      y < item.y + item.h &&
      y + 1 > item.y
    );

    if (!isOccupied) {
      const newItem: CustomLayout = {
        isBounded: false,
        isDraggable: true,
        isResizable: true,
        maxH: 1,
        maxW: 48,
        minH: 1,
        minW: 1,
        i: uuidv4(),
        x,
        y,
        w: 2,
        h: 1,
        title: "일정",
        content: "내용",
        resizeHandles: ["e"],
      };
      setLayout([...layout, newItem]);
      console.log(layout)
    }
  };
};
