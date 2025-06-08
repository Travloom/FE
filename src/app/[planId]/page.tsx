'use client'

import Button from "@/components/common/Button";
import { useEffect } from "react";
import usePageStore from "../../stores/usePageStore";
import Planner from "@/components/plan/Planner";
import Motion from "@/components/motion/Motion";
import usePlanStore from "@/stores/usePlanStore";
import { usePlanInfo } from "@/hooks/plan/usePlanInfo";
import { useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

const PlanPage = () => {

  const {
    tags,
    isInfoPending,
  } = usePlanStore();

  const {
    isPagePending,
    setIsPagePending,
  } = usePageStore()

  const { planId }: { planId: string } = useParams();

  usePlanInfo(planId);

  useEffect(() => {
    setIsPagePending(false);
  }, [])

  return (
    <AnimatePresence>
      {!isPagePending && !isInfoPending &&
        <Motion.MotionDiv
          className={`
              lg:p-[60px] lg:pt-[140px]
              pt-[70px] gap-2.5 flex flex-col h-full transition-all-300-out`}>
          <div className={`lg:p-0 px-2.5 flex flex-row justify-between`}>
            <div className={`flex flex-row gap-2.5 transition-all-300-out`}>
              {tags?.region && <Button text={tags?.region} isActive={false} />}
              {tags?.people && <Button text={tags?.people} isActive={false} />}
              {tags?.companions && <Button text={tags?.companions} isActive={false} />}
              {tags?.theme && <Button text={tags?.theme} isActive={false} />}
            </div>
            <Button text={"공유"} isActive={true} />
          </div>
          <Planner />
        </Motion.MotionDiv>
      }
    </AnimatePresence>
  )
}

export default PlanPage;