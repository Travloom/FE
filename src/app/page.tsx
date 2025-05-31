'use client'

import PlanInput from "@/components/common/PlanInput";
import TagButton from "@/components/common/TagButton";
import { TAGLIST } from "@/constants/Tag";
import { AnimatePresence } from "framer-motion";
import usePageStore from "../stores/usePageStore";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import Motion from "@/components/motion/Motion";
import useInitPage from "@/hooks/common/useInitPage";

export default function Home() {

  const {
    isPagePending,
  } = usePageStore();

  const pageAnimateRouter = usePageAnimateRouter();

  useInitPage(null)
  
  return (
    <>
      <AnimatePresence>
        {!isPagePending &&
          <Motion.MotionDiv
            className={`
              md:px-[200px] 
              w-full h-full px-[28px] pb-[60px] pt-[100px] transition-all-300-out`}>
            <div className={`flex flex-col gap-[40px] pb-[20px] h-full justify-center`}>
              <div 
                className={`
                  lg:gap-5
                  gap-2.5 flex flex-col w-full justify-center items-center`}>
                <p
                  className={`
                    lg:text-[40px]
                    text-point text-[28px] transition-all-300-out`}>
                  어디로 떠나볼까요?
                </p>
                <div 
                  className={`
                    lg:gap-5 lg:max-w-[750px]
                    gap-2.5 w-full  flex flex-col transition-all-300-out`}>
                  <PlanInput />
                  <div 
                    className={`
                      lg:max-h-[119px]
                      max-h-[108px] w-full flex flex-col gap-10`}>
                    <div className={`flex flex-row gap-2.5 w-full top-0`}>
                      {TAGLIST.map((tag, index) => (
                        <TagButton key={index} title={tag.title} tagList={tag.tagList} />
                      ))}
                    </div>
                    <p
                      className={`
                        lg:text-[20px] 
                        text-[14px] self-center text-point cursor-pointer pb-[20px] transition-all-300-out`}
                      onClick={() => pageAnimateRouter.push("/1")}>추천 없이 떠나기</p>
                  </div>
                </div>
              </div>
            </div>
          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </>
  );
}
