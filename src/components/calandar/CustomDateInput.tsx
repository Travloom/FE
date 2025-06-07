import useMobile from "@/hooks/common/useMobile";
import { forwardRef, useEffect, useRef, useState } from "react";

export const CustomDateInput = forwardRef<HTMLDivElement, { value: string; onClick: () => void, label: string, startDate: Date | null, endDate: Date | null }>(
  ({ value, onClick, label, startDate, endDate }, ref) => {

    const [width, setWidth] = useState(35);
    const pRef = useRef<HTMLParagraphElement>(null);

    const { isMobile, isUnderTablet } = useMobile();

    const [ dayDiff, setDayDiff ] = useState<number | null>(null);

    useEffect(() => {
      
      let diff

      if (endDate && startDate) {
        const timeDiff = endDate.getTime() - startDate.getTime() + 1;
        diff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        setDayDiff(diff);
      }
      else {
        setDayDiff(null)
      }
      
      const w = 
        isMobile ? ( diff ? 50 : 27 ) :
        (endDate ? ( isUnderTablet ? 133 : 170 ) : 
        (startDate ? ( isUnderTablet ? 70 : 90 ) : ( isUnderTablet ? 27 : 35 )))
      setWidth(w)
    }, [startDate, endDate, value, label, isMobile, isUnderTablet]);

    return (
      <div
        className={`
          ${endDate ? `text-point border-point` : `text-gray-300 border-gray-300 `} 
          lg:text-[18px] 
          text-[14px] bg-white h-fit px-3 py-1.5 rounded-[20px] border text-center select-none cursor-pointer overflow-hidden`}
        onClick={onClick}
        ref={ref}>
        <p style={{
          width: width,
          whiteSpace: 'nowrap', // 필요에 따라
        }} ref={pRef} className={`mt-0.5 transition-all-300-out flex justify-center items-center`}>{isMobile ? (dayDiff ? `${dayDiff}박 ${dayDiff+1}일` : label) : (value || label)}</p>
      </div>
    );
  }
)

CustomDateInput.displayName = "CustomDateInput";