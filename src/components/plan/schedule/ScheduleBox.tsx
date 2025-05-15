import { AnimatePresence } from "framer-motion";
import { RightArrowIcon } from "../../../assets/svgs";
import Motion from "@/components/motion/Motion";

interface PlanBoxProps {
  title: string;
  content: string;
}

const ScheduleBox:React.FC<PlanBoxProps> = ({
  title,
  content
}) => {

  return (
    <AnimatePresence>
      <Motion.MotionDiv
        onClick={(e) => {e.stopPropagation()}}
        className={`flex items-center justify-between gap-1 bg-white rounded-[8px] border border-gray-300 px-1.5 py-1.5 w-full h-full cursor-pointer`}>
        <div className={`flex flex-col gap-1 h-full`}>
          <p className={`text-black text-[12px]`}>{title}</p>
          <p className={`text-gray-300 text-[10px]`}>{content}</p>
        </div>
        <RightArrowIcon className={`h-3.5 text-gray-300`}/>
      </Motion.MotionDiv>
    </AnimatePresence>
  )
}

export default ScheduleBox;