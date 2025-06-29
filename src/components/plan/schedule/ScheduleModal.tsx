'use client'

import useScheduleModalStore from "@/stores/useScheduleModalStore";
import Portal from "../../portal/Portal";
import Motion from "../../motion/Motion";
import { CustomLayout } from "@/types/schedule/types";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { DeleteIcon } from "@/assets/svgs";
import { AnimatePresence } from "framer-motion";


interface ScheduleModalProps {
  layout: CustomLayout[];
  setLayout: Dispatch<SetStateAction<CustomLayout[]>>;
  updateSchedule: (updatedLayout: CustomLayout[]) => void;
}
const ScheduleModal: React.FC<ScheduleModalProps> = ({
  setLayout,
  updateSchedule,
}) => {
  const {
    isScheduleModalOpen,
    schedule,
    setIsScheduleModalOpen,
    setSchedule,
    setScheduleTitle,
    setScheduleContent,
  } = useScheduleModalStore();

  const preventEvent = (e: React.MouseEvent) => e.stopPropagation();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const debouncedUpdateSchedule = debounce((updated: CustomLayout[]) => {
    updateSchedule(updated)
  }, 500);

  const deleteSchedule = () => {
    if (!schedule.scheduleId) return;

    setSchedule({ scheduleId: null, title: null, content: null })
    setIsScheduleModalOpen(false);

    setLayout((prevLayout) => {
      const updated = prevLayout.filter(item => item.i !== schedule.scheduleId);
      updateSchedule(updated);

      return updated;
    })
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [schedule.content, isScheduleModalOpen])

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
            className="absolute top-0 left-0 w-full h-full bg-[rgba(1,1,1,0.2)] z-[9999] flex items-center justify-center"
            onClick={() => setIsScheduleModalOpen(false)}
          >
            <div
              className="
                md:w-1/3 md:h-fit
                w-2/3 h-2/5 min-h-[300px]
                relative flex flex-col justify-start gap-1 items-center p-4 bg-white rounded-[8px] border border-gray-300"
              onClick={preventEvent}
            >
              <input
                className={`
                  md:py-1.5 md:px-2 md:text-start
                  hover:bg-gray-100 focus:cursor-text focus:bg-gray-50
                  py-1 px-1.5 text-center text-[20px] cursor-pointer w-full truncate rounded-[4px] transition-all-300-out`}
                value={schedule.title || ""}
                onChange={(e) => onScheduleChange(e, setScheduleTitle)}
              />
              <textarea
                ref={textareaRef}
                className={`
                  md:py-1.5 md:px-2 md:text-start
                  hover:bg-gray-100 focus:cursor-text focus:bg-gray-50 content-start overflow-clip
                  py-1 px-1.5 text-center text-[14px] cursor-pointer text-gray-500 w-full resize-none outline-0 rounded-[4px] transition-all-300-out`}
                value={schedule.content || ""}

                onChange={(e) => onScheduleChange(e, setScheduleContent)}
              />
              <DeleteIcon
                className={`
                  md:w-8 md:-right-10
                  text-[#ff4d4d] w-6 -right-7.5 top-2 absolute cursor-pointer transition-all-300-out`}
                onClick={deleteSchedule} />
            </div>
          </Motion.MotionDiv>
        )}
      </AnimatePresence>
    </Portal>
  );
};


export default ScheduleModal;