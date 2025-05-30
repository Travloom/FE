import { AnimatePresence } from "framer-motion";
import { RightArrowIcon } from "../../../assets/svgs";
import Motion from "@/components/motion/Motion";
import { useLongPress } from "@/hooks/common/useLongPress";
import useScheduleModalStore from "@/stores/useScheduleModalStore";

interface PlanBoxProps {
  scheduleId: string;
  title: string;
  content: string;
}

const ScheduleBox: React.FC<PlanBoxProps> = ({
  scheduleId,
  title,
  content
}) => {

  const {
    setIsScheduleModalOpen,
    setSchedule,
  } = useScheduleModalStore();

  const handleOpenPlanModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsScheduleModalOpen(true)
    setSchedule({ scheduleId, title, content })
  }

  const bind = useLongPress(() => {
    handleOpenPlanModal()
  }, {
    threshold: 500,
  })

  return (
    <AnimatePresence>
      <Motion.MotionDiv
        {...bind}
        onContextMenu={handleOpenPlanModal}
        onClick={(e) => { e.stopPropagation() }}
        className={`
          md:flex-row md:p-1.5 md:gap-1
          flex-col p-1
          flex items-center justify-between bg-white rounded-[8px] border border-gray-300 w-full h-full cursor-pointer`}>
        <div className={`md:gap-1 flex flex-col w-full h-full grow overflow-hidden`}>
          <p
            className={`
              md:text-[12px]
              max-md:text-center
            text-black text-[10px] truncate shrink-0`}>{title}</p>
          <p
            className={`
              md:line-clamp-6
              max-md:text-center md:text-[10px]
              text-gray-300 text-[8px] w-full grow break-all whitespace-pre-line`}>
            {content}
          </p>
        </div>
        <RightArrowIcon
          className={`
            md:h-3.5 md:rotate-0
            h-2.5 rotate-90 text-gray-300`} />
      </Motion.MotionDiv>
    </AnimatePresence>
  )
}

export default ScheduleBox;