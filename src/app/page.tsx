'use client'

import PlanInput from "@/components/common/PlanInput";
import TagButton from "@/components/common/TagButton";
import { TAGLIST } from "@/constants/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import usePageStore from "../stores/usePageStore";
import usePageAnimateRouter from "@/hooks/usePageAnimateRouter";

export default function Home() {

  const {
    isPagePending,
    setIsPagePending,
  } = usePageStore();

  const pageAnimateRouter = usePageAnimateRouter();

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
            className={`w-full h-full p-[60px] pt-[30%]`}>
            <div className={`flex flex-col gap-[40px] pb-[20px] h-full`}>
              <div className={`flex flex-col gap-5 w-full justify-center items-center`}>
                <p className={`text-[40px] text-point`}>어디로 떠나볼까요?</p>
                <div className={`flex flex-col gap-5 w-[50%] max-w-[750px]`}>
                  <PlanInput />
                  <div className={`w-full`}>
                    <div className={`flex flex-row gap-2.5 w-full top-0`}>
                      {TAGLIST.map((tag, index) => (
                        <TagButton key={index} title={tag.title} tagList={tag.tagList} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p
                className={`self-center text-point text-[20px] cursor-pointer pb-[20px]`}
                onClick={() => pageAnimateRouter.push("/1")}>추천 없이 떠나기</p>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  );
}
