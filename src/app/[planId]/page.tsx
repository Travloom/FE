'use client'

import Button from "@/components/common/Button";
import { useEffect  } from "react";
import usePageStore from "../../stores/usePageStore";
import Planner from "@/components/plan/Planner";
import Motion from "@/components/motion/Motion";
import usePlanStore from "@/stores/usePlanStore";

const PlanPage = () => {

  const {
    tags
  } = usePlanStore();

  const {
    isPagePending,
    setIsPagePending,
  } = usePageStore()

  useEffect(() => {
    setIsPagePending(false);
  }, [])

  return (
    <>
        {!isPagePending && 
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
            <Planner/>
          </Motion.MotionDiv>
        }
    </>
  )
}

export default PlanPage;