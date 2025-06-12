import { TagsType } from "@/types/place/type";
import PlanTag from "./PlanTag";
import dayjs from "dayjs";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";

interface PlanBoxProps {
  planId: string,
  startDate: string;
  endDate: string;
  title: string;
  tags: TagsType;
}

const PlanBox: React.FC<PlanBoxProps> = ({
  planId,
  startDate,
  endDate,
  title,
  tags
}) => {

  const pageAnimateRouter = usePageAnimateRouter();

  return (
    <div 
      className={`
        lg:h-[220px]
        h-[200px] flex flex-col gap-2.5 rounded-[8px] border border-gray-200 text-point p-2.5 aspect-square cursor-pointer select-none hover:bg-[rgba(108,92,231,0.08)] transition-all-300-out`}
      onClick={() => pageAnimateRouter.push(`/${planId}`)}>
      <div 
        className={`
          lg:text-[12px] lg:py-2
          text-[10px] py-1.5 rounded-[4px]  w-full h-fit text-white bg-point truncate flex items-center justify-center`}>
        <p className={`truncate mt-0.5`}>
          {dayjs(startDate).format("YYYY.MM.DD")} - {dayjs(endDate).format("YYYY.MM.DD")}
        </p>
      </div>
      <div 
        className={`
          lg:text-[16px]
          text-[14px] w-full truncate border-b border-point text-center pb-1.5`}>
        {title}
      </div>
      <div className={`flex flex-wrap gap-1.5 px-2.5`}>
        {Object.entries(tags).map(([key, tag]) => (
          <PlanTag key={planId + key} text={tag} />
        ))}
      </div>
    </div>
  )
}

export default PlanBox;