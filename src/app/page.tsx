'use client'

import PlanInput from "@/components/home/PlanInput";
import TagButton from "@/components/home/TagButton";
import { TAGLIST } from "@/constants/Tag";
import usePageStore from "../stores/usePageStore";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import Motion from "@/components/motion/Motion";
import useInitPage from "@/hooks/common/useInitPage";
import CustomDatePicker from "@/components/date-picker/CustomDatePicker";
import useHomeStore from "@/stores/useHomeStore";
import { TagsType } from "@/types/place/type";
import { AnimatePresence } from "framer-motion";
import { createPlanRequest } from "@/apis/plan";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import LoadingModal from "@/components/home/LodingModal";

export default function Home() {

  const {
    isPagePending,
  } = usePageStore();


  const {
    setIsCreating,

    title,
    tags,
    startDate,
    endDate,
    setTag,
  } = useHomeStore();

  const [isAllTagSelected, setIsAllTagSelected] = useState(false);

  useEffect(() => {
    setIsAllTagSelected(Object.values(tags).every((tag) => !!tag));
  }, [tags])

  const pageAnimateRouter = usePageAnimateRouter();

  useInitPage(null)

  const createPlan = async () => {
    if (isAllTagSelected && title && startDate && endDate && !isPending) {
      try {
        const plan = await createPlanRequest({
          title: title,
          startDate: startDate,
          endDate: endDate,
          region: tags.region as string,
          people: tags.people as string,
          companions: tags.companions as string,
          theme: tags.theme as string,
        });

        pageAnimateRouter.push(`/${plan.uuid}`)

      } catch (e) {
        console.log(e)
      }
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: createPlan,
    onMutate: () => {
      setIsCreating(true)
    },
    onSettled: () => {
      setIsCreating(false)
    }
  })

  return (
    <AnimatePresence>
      {!isPagePending &&
        <>
          <Motion.MotionDiv
            className={`
              md:px-[20%] 
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
                    <div className={`flex flex-row gap-2.5 w-full top-0 flex-wrap`}>
                      <CustomDatePicker />
                      {Object.entries(TAGLIST).map(([key, tag]) => (
                        <TagButton
                          key={key}
                          title={tag.title}
                          tagList={tag.tagList}
                          currentTag={tags[key as keyof TagsType] || tag.title}
                          setCurrentTag={(value: string) => setTag(key as keyof TagsType, value)}
                        />
                      ))}
                    </div>
                    <p
                      className={`
                      ${(isAllTagSelected && title && startDate && endDate && !isPending) ? `text-point cursor-pointer` : `text-gray-200`}
                        lg:text-[20px] 
                        text-[14px] self-center pb-[20px] transition-all-300-out select-none`}
                      onClick={() => mutate()}>추천 없이 떠나기</p>
                  </div>
                </div>
              </div>
            </div>
          </Motion.MotionDiv>
          <LoadingModal />
        </>
      }
    </AnimatePresence>
  );
}
