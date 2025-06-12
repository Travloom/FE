'use client'

import { useQuery } from "@tanstack/react-query";
import PlanBox from "./PlanBox";
import { getPlansRequest } from "@/apis/plan";
import { TagsType } from "@/types/place/type";
import { HashLoader } from "react-spinners";

interface Plan {
  uuid: string;
  title: string;
  tags: TagsType;
  startDate: Date;
  endDate: Date;
}

interface PlanListProps {
  requestQuery: {
    before?: Date;
    after?: Date;
  }
}

const PlanList: React.FC<PlanListProps> = ({
  requestQuery
}) => {

  const { data, isPending } = useQuery({
    queryKey: ['getPlans', requestQuery.before ? 'before' : `after`],
    queryFn: () => requestQuery.before
      ? getPlansRequest({ before: requestQuery.before })
      : getPlansRequest({ after: requestQuery.after }),
  })

  return (
    <div
      className={`
        lg:px-6
        md:px-5 md:py-4
        px-4 py-3 flex flex-col grow justify-between items-center w-full transition-all-300-out`}>
      <div className={`border-b border-gray-200 w-full pb-2`}>
        <p className={`w-fit`}>{requestQuery.before ? `지난 여행` : `다가오는 여행`}</p>
      </div>
      <div className={`w-full h-full overflow-auto pt-4 flex gap-2.5 no-scroll`}>
        {isPending ? (
          <div className={`flex justify-center items-center w-full h-full`}>
            <HashLoader
              size={30}
              color={`#6c5ce7`} />
          </div>
        ) : (
          data?.length > 0 ? (
            data?.map((plan: Plan) => (
              <PlanBox key={plan.uuid} planId={plan.uuid} startDate={plan.startDate.toString()} endDate={plan.endDate.toString()} title={plan.title} tags={plan.tags} />
            ))
          ) : (
            <p
              className={`
              lg:text-[18px]
              md:text-[16px] 
              text-[14px] text-gray-200 w-full h-full flex justify-center items-center text-center transition-all-300-out py-5`}>여행 기록이 없어요. 여행을 떠나보세요!</p>
          )
        )}
      </div>
    </div>
  )
}

export default PlanList;