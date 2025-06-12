import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { SCHEDULE_HEIGHT, TIME_DIVIDE } from "@/constants/Plan";
import { CustomLayout } from "@/types/schedule/types";

export const useAddScheduleBox = (day: number, layout: CustomLayout[], setLayout: (val: CustomLayout[]) => void) => {
  return (e: MouseEvent<HTMLDivElement>) => {
    const colWidth = 3000 / TIME_DIVIDE;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const x = Math.max(Math.floor(offsetX / colWidth), 0);
    const y = Math.min(Math.max(Math.floor((offsetY - 10) / (SCHEDULE_HEIGHT + 20)), 0), day-1);
    console.log(x, y)

    const isOccupied = layout.some(item =>
      (
        x < item.x + item.w &&
        x + 2 > item.x &&
        y < item.y + item.h &&
        y + 1 > item.y
      )
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
    }
  };
};
