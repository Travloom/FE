'use client'

import { PlaceProps } from "@/types/plan/type";
import Image from "next/image";

const Place: React.FC<PlaceProps> = ({
  name,
  rate,
  detail,
  imageUrl,
}) => {

  return (
    <div 
      className={`
        lg:gap-2.5 lg:h-[140px]
        flex flex-row w-full h-[120px] min-h-[120px] rounded-[8px] border border-gray-200 p-2.5 bg-white`}>
      <div className={`overflow-hidden rounded-[4px] border border-gray-200 h-full aspect-square relative`}>
        <Image
          className={`object-cover`}
          src={imageUrl}
          fill
          alt={"이미지"} 
          unoptimized/>
      </div>
      <div className={`lg:gap-2.5 gap-1.5 flex flex-col px-2.5 py-1`}>
        <p className={`lg:text-[20px] md:text-[16px] text-[14px]`}>{name}</p>
        <div className={`lg:text-[16px] md:text-[14px] text-[12px] flex flex-col gap-1 text-gray-400`}>
          <p>평점 : {rate}</p>
          <p>{detail}</p>
        </div>
      </div>
    </div>
  )
}

export default Place;