import { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { COLS, DAY_LIST_WIDTH, GRID_WIDTH, GRID_HEIGHT } from "@/constants/Plan";
import { CustomLayout } from "@/types/schedule/types";

export const useAddPlanBox = (layout: CustomLayout[], setLayout: (val: CustomLayout[]) => void) => {
  return (e: MouseEvent<HTMLDivElement>) => {
    const gridWidth = (GRID_WIDTH - DAY_LIST_WIDTH);
    const colWidth = gridWidth / COLS;
    const rowHeight = GRID_HEIGHT / 4;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const x = Math.floor(offsetX / colWidth);
    const y = Math.floor(offsetY / rowHeight);

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
        maxW: 6,
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
