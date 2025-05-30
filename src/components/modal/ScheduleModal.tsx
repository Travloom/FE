'use client'

import useScheduleModalStore from "@/stores/useScheduleModalStore";
import Portal from "../portal/Portal";
import { AnimatePresence } from "framer-motion";
import Motion from "../motion/Motion";
import { CustomLayout } from "@/types/schedule/types";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { debounce } from "lodash";


interface ScheduleModalProps {
  layout: CustomLayout[];
  setLayout: Dispatch<SetStateAction<CustomLayout[]>>;
  updateSchedule: (updatedLayout: CustomLayout[]) => void;
}
const ScheduleModal: React.FC<ScheduleModalProps> = ({
  layout,
  setLayout,
  updateSchedule,
}) => {
  const {
    isScheduleModalOpen,
    schedule,
    setIsScheduleModalOpen,
    setScheduleTitle,
    setScheduleContent,
  } = useScheduleModalStore();

  const preventEvent = (e: React.MouseEvent) => e.stopPropagation();


  const debouncedUpdateSchedule = debounce((updated: CustomLayout[]) => {
    updateSchedule(updated)
  }, 500);


  useEffect(() => {
    if (!schedule.scheduleId) return;

    setLayout((prevLayout) => {
      const updated = prevLayout.map((item) =>
        item.i === schedule.scheduleId
          ? {
            ...item,
            title: schedule.title || "",
            content: schedule.content || "",
          }
          : item
      );
      debouncedUpdateSchedule(updated);
      return updated;
    });
  }, [schedule.title, schedule.content]);


  const onScheduleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      set: (value: string) => void
    ) => {
      set(e.target.value);
    },
    []
  );

  return (
    <Portal>
      <AnimatePresence>
        {isScheduleModalOpen && (
          <Motion.MotionDiv
            className="absolute top-0 left-0 w-full h-full bg-[rgba(1,1,1,0.2)] z-100 flex items-center justify-center"
            onClick={() => setIsScheduleModalOpen(false)}
          >
            <div
              className="flex flex-col justify-start gap-2.5 items-center p-4 bg-white w-1/2 h-1/2 rounded-[8px] border border-gray-300"
              onClick={preventEvent}
            >
              <input
                className={`
                  hover:bg-gray-100 focus:hover:bg-white focus:cursor-text
                  text-[20px] cursor-pointer w-full text-center truncate rounded-[4px] py-1.5 px-2`}
                value={schedule.title || ""}
                onChange={(e) => onScheduleChange(e, setScheduleTitle)}
              />
              <textarea
                className={`
                  hover:bg-gray-100 focus:hover:bg-white focus:cursor-text
                  text-[14px] cursor-pointer text-gray-500 w-full h-full text-center resize-none outline-0 rounded-[4px] px-1.5 py-2`}
                value={schedule.content || ""}
                onChange={(e) => onScheduleChange(e, setScheduleContent)}
              />
            </div>
          </Motion.MotionDiv>
        )}
      </AnimatePresence>
    </Portal>
  );
};


export default ScheduleModal;