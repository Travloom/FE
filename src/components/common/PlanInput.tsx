'use client'

import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import { PlaneIcon } from "../../assets/svgs";
import { planRecommendRequest } from "@/apis/plan";
import useHomeStore from "@/stores/useHomeStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const PlanInput = () => {

  const {
    title,
    tags,
    startDate,
    endDate,
    setTitle,
  } = useHomeStore();

  const pageAnimateRouter = usePageAnimateRouter();

  const [isAllTagSelected, setIsAllTagSelected] = useState(false);

  useEffect(() => {
    setIsAllTagSelected(Object.values(tags).every((tag) => !!tag));
  }, [tags])

  const planRecommend = async () => {
    if (isAllTagSelected && title && startDate && endDate) {
      try {
        const plan = await planRecommendRequest({
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
    mutationFn: planRecommend,
    onSuccess: () => {
    },
  });

  return (
    <div
      className={`
      lg:px-6 lg:py-4.5
      px-5 py-3.5 flex justify-between gap-2.5 rounded-full w-full  bg-white border border-gray-300 overflow-hidden transition-all-300-out`}>
      <input
        className={`
          lg:text-[20px] 
          w-full text-[16px] font-light text-gray-700 placeholder:text-gray-300 grow transition-all-300-out`}
        placeholder="여행 플랜 이름을 입력해주세요"
        value={title || ``}
        onChange={(e) => setTitle(e.target.value)} />
      <PlaneIcon
        className={`
          ${(title?.trim() !== "" && isAllTagSelected && title && startDate && endDate) ? `text-point` : `text-gray-300`}
          lg:w-6 w-4 cursor-pointer transition-all-300-out`}
        onClick={() => {
          if (title?.trim() !== "" && isAllTagSelected && startDate && endDate) {
            mutate();
          }
        }} />
        {isPending &&
        <div className={`absolute w-screen h-screen bg-[rgba(1,1,1,0.5)]`}>
        </div>
        }
    </div>
  )
}

export default PlanInput;