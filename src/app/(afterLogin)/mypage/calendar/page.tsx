'use client'

import CustomFullCalendar from "@/components/calandar/FullCalendar";
import Motion from "@/components/motion/Motion";
import useInitPage from "@/hooks/common/useInitPage";
import usePageStore from "@/stores/usePageStore";
import { AnimatePresence } from "framer-motion";

export default function CalendarPage() {

  const {
    isPagePending,
  } = usePageStore()

  useInitPage('캘린더')

  return (
    <AnimatePresence>
      {!isPagePending &&
        <Motion.MotionDiv
          className={`
              lg:p-[60px] lg:pt-[140px]
              pt-[70px] gap-2.5 flex flex-col h-full transition-all-300-out`}>
          <CustomFullCalendar />
        </Motion.MotionDiv>
      }
    </AnimatePresence>
  )
}
