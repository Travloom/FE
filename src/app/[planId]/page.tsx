'use client'

import Button from "@/components/common/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import usePageStore from "../../stores/usePageStore";
import Planner from "@/components/plan/Planner";

const PlanPage = () => {

  const {
    isPagePending,
    setIsPagePending,
  } = usePageStore()

  useEffect(() => {
    setIsPagePending(false);
  }, [])

  return (
    <>
      <AnimatePresence>
        {!isPagePending &&
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col gap-2.5 p-[60px] pt-[140px]`}>
            <div className={`flex flex-row justify-between`}>
              <div className={`flex flex-row gap-2.5`}>
                <Button text={"부산"} isActive={false} />
                <Button text={"연인"} isActive={false} />
                <Button text={"먹방 투어"} isActive={false} />
              </div>
              <Button text={"공유"} isActive={true} />
            </div>
            <Planner/>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default PlanPage;